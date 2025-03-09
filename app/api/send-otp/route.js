// app/api/send-otp/route.js
import { NextResponse } from "next/server";
import twilio from "twilio";
import clientPromise from "../../../lib/mongodb"; // MongoDB client
import { generateOTP } from "@/utils/otp"; // OTP generation function

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request) {
  const { phoneNumber } = await request.json();

  // Generate OTP
  const otp = generateOTP();

  try {
    // Twilio se OTP bhejna
    await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,  
      to: phoneNumber,
    });

    // MongoDB connection
    const clientDb = await clientPromise;
    const db = clientDb.db();
    const otpCollection = db.collection("otps");

    // Save OTP in MongoDB
    await otpCollection.updateOne(
      { phoneNumber: phoneNumber }, // Check if phone number already exists
      { $set: { otp: otp, createdAt: new Date() } },
      { upsert: true } // If not found, create a new entry
    );

    // Return success message
    return NextResponse.json({ message: "OTP Sent Successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Error sending OTP", error: error.message });
  }
}
