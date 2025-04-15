

import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
console.log("KEY:", process.env.RAZORPAY_KEY);
console.log("SECRET:", process.env.RAZORPAY_SECRET);


export async function POST(request) {
  try {
    const { amount } = await request.json();

    const order = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

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
