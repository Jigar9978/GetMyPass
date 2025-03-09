// app/api/create-order/route.js

import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount } = await request.json();  // Fetch the amount from the body

    // Create an order with Razorpay
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Convert the amount to paise
      currency: "INR",
      receipt: "receipt#1", // Unique receipt ID
    });

    // Send the order ID back as the response
    return new Response(
      JSON.stringify({ orderId: order.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


