import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs"; 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json({ success: false, message: "Phone number is required!" }, { status: 400 });
    }

    phoneNumber = `+${phoneNumber.trim().replace(/\s/g, '')}`;

    console.log("Searching phoneNumber:", phoneNumber); // ✅ Debugging

    const client = await clientPromise;
    if (!client) {
      console.error("MongoDB client is not connected!");
      return NextResponse.json({ success: false, message: "Database connection error!" }, { status: 500 });
    }

    const db = client.db("events");
    const collection = db.collection("profiles");

    const user = await collection.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching profile:", error.message, error.stack);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
