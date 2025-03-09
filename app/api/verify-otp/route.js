import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  const { phoneNumber, otp } = await request.json();

  const client = await clientPromise;
  const db = client.db();
  const otpCollection = db.collection("otps");

  // MongoDB se OTP fetch karna
  const storedOTP = await otpCollection.findOne({ phoneNumber: phoneNumber });

  const receivedOtp = Array.isArray(otp) ? otp.join("") : String(otp); // Ensure OTP is a string
  const storedOtpString = String(storedOTP?.otp || ""); // Convert stored OTP to string

  console.log("Received phone number:", phoneNumber);
  console.log("Received OTP:", receivedOtp);
  console.log("Stored OTP:", storedOtpString);

  // OTP match check karna
  if (storedOtpString === receivedOtp) {
    console.log("OTP matched successfully!");
    const response = NextResponse.json({ message: "OTP verified successfully!" });

    // MongoDB entry ko update karna
    const updateResult = await otpCollection.updateOne(
      { phoneNumber: phoneNumber },
      {
        $set: { 
          verified: true, 
          verifiedAt: new Date(), 
          isLogin: true,
        },
      }
    );

    console.log("MongoDB Update Result:", updateResult);

    // Cookie set karna
    response.cookies.set("loggedInPhoneNumber", phoneNumber, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days expiration
    });

    console.log("Cookie set for:", phoneNumber);
    return response;
  } else {
    console.log("OTP did not match!");
    return NextResponse.json(
      { message: "Invalid OTP, please try again.", error: "Invalid OTP" },
      { status: 401 }
    );
  }
}
