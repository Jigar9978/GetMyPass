import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("events");

    // Fetch users from profiles collection
    const profiles = await db.collection("profiles").find({}).toArray();

    // Fetch account status & joined date from otps collection
    const otps = await db.collection("otps").find({}).toArray();

    // Map user phone numbers to their corresponding account status & join date
    const otpMap = {};
    otps.forEach(otp => {
      otpMap[otp.phoneNumber] = {
        accountStatus: otp.isLogin ? "Active" : "Suspended",
        joinedDate: otp.createdAt ? new Date(otp.createdAt).toISOString().split("T")[0] : "N/A"
      };
    });

    // Merge profile data with OTP details
    const users = profiles.map(user => ({
      userId: user._id.toString(),
      firstName: user.profileDetails?.name?.split(" ")[0] || "N/A",
      lastName: user.profileDetails?.name?.split(" ")[1] || "",
      email: user.email || "Not Provided",
      phone: user.phoneNumber || "Not Provided",
      userType: user.profileDetails?.gender || "Unknown",
      birthDate: user.profileDetails?.dob || "Not Provided",
      joinedDate: otpMap[user.phoneNumber]?.joinedDate || "N/A",
      accountStatus: otpMap[user.phoneNumber]?.accountStatus || "Unknown"
    }));

    return NextResponse.json({ success: true, users }, { status: 200 });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
