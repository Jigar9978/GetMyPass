import clientPromise from '../../../lib/mongodb';

export async function GET(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('events');
    const collection = db.collection('categories');
    const deletedCollection = db.collection('deletedCards');

    const currentDate = new Date(); // Current date and time

    // Fetch all categories
    const categories = await collection.find({}).toArray();

    for (const category of categories) {
      const expiredCards = category.cards.filter((card) => {
        // Combine endDate and endTime to create a Date object for comparison
        const eventEndDateTime = new Date(`${card.endDate} ${card.endTime}`);
        return eventEndDateTime <= currentDate; // If expired
      });

      if (expiredCards.length > 0) {
        // Remove expired cards from the current category
        const updatedCards = category.cards.filter((card) => {
          const eventEndDateTime = new Date(`${card.endDate} ${card.endTime}`);
          return eventEndDateTime > currentDate; // Keep non-expired cards
        });

        // Update the category by removing expired cards
        await collection.updateOne(
          { _id: category._id },
          { $set: { cards: updatedCards } }
        );

        // Save expired cards to deletedCards collection
        await deletedCollection.insertMany(
          expiredCards.map((card) => ({
            ...card,
            categoryName: category.name,
            deletedAt: currentDate, // Save deletion time
          }))
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Expired events processed successfully.',
    });
  } catch (error) {
    console.error('Error processing expired events:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
    });
  }
}
