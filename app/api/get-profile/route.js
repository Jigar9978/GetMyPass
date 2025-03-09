import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json({ success: false, message: "Phone number is required!" }, { status: 400 });
    }

    // Trim करके, अगर `+` नहीं है तो जोड़ो और spaces हटा दो
    phoneNumber = `+${phoneNumber.trim().replace(/\s/g, '')}`;

  

    const client = await clientPromise;
    const db = client.db("events");
    const collection = db.collection("profiles");

    const user = await collection.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
