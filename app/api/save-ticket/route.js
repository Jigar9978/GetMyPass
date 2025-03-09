import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Ticket from '../../../models/Ticket';
import Category from '../../../models/Category';

export async function POST(req) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();
    console.log("Request Body:", body);

    const { userId, eventName, eventImage, eventDate, eventLocation, eventTime, eventEnddate, eventEndtime, tickets, paymentId } = body;

    if (!userId || !eventName || !eventImage || !eventDate || !eventLocation || !eventTime || !eventEnddate || !eventEndtime || !paymentId || !tickets) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Find the event in categories
    const categories = await Category.find({ "cards.title": eventName });

    if (!categories.length) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Event not found' }),
        { status: 404 }
      );
    }

    let eventFound = false;

    for (let category of categories) {
      const event = category.cards.find(card => card.title === eventName);

      if (event) {
        eventFound = true;

        tickets.forEach(purchasedTicket => {
          const ticketToUpdate = event.tickets.find(t => t.type === purchasedTicket.category);

          if (!ticketToUpdate) {
            return new NextResponse(
              JSON.stringify({ success: false, error: `Ticket type ${purchasedTicket.category} not found` }),
              { status: 400 }
            );
          }

          if (ticketToUpdate.contity < purchasedTicket.count) {
            return new NextResponse(
              JSON.stringify({ success: false, error: `Not enough ${purchasedTicket.category} tickets available` }),
              { status: 400 }
            );
          }

          ticketToUpdate.contity -= purchasedTicket.count;
        });

        await category.save();
      }
    }

    if (!eventFound) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Event not found in any category' }),
        { status: 404 }
      );
    }

    // Save the ticket purchase details
    const formattedTickets = tickets.map(ticket => ({
      category: ticket.category,
      count: ticket.count,
      price: ticket.price
    }));

    const ticket = await Ticket.create({
      userId, // Now it's stored as a string
      eventName,
      eventDate,
      eventLocation,
      eventEnddate,
      eventEndtime,
      eventImage,
      eventTime,
      tickets: formattedTickets,
      paymentId
    });

    return new NextResponse(
      JSON.stringify({ success: true, ticket }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Failed to save ticket' }),
      { status: 500 }
    );
  }
}
