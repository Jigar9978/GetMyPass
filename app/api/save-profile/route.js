import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; 

export const runtime = "nodejs"; 

export async function POST(req) {
  try {
    const formData = await req.formData();

    // 🟢 Required Fields
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const dob = formData.get("dob");
    const gender = formData.get("gender");
    const house = formData.get("house");
    const street = formData.get("street");
    const locality = formData.get("locality");
    const city = formData.get("city");
    const state = formData.get("state");
    const pincode = formData.get("pincode");

    if (!email || !phoneNumber || !firstName || !lastName || !dob || !gender || !house || !street || !locality || !city || !state || !pincode) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // 🟢 Image Upload
    const imageFile = formData.get("avatar");
    let imageName = null;

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      imageName = `${Date.now()}-${imageFile.name}`;
      
      // ✅ Fix: Use /tmp for Vercel
      const imagePath = path.join("/tmp", imageName); 
      await writeFile(imagePath, Buffer.from(bytes));
    }

    // 🟢 MongoDB से कनेक्ट करें
    const client = await clientPromise;
    const db = client.db("events");

    // 🟢 प्रोफाइल अपडेट करो या नया बनाओ
    const updatedProfile = await db.collection("profiles").findOneAndUpdate(
      { phoneNumber },
      {
        $set: {
          email,
          phoneNumber,
          profileDetails: {
            name: `${firstName} ${lastName}`,
            dob,
            gender,
            avatar: imageName,
          },
          address: {
            house,
            street,
            locality,
            city,
            state,
            pincode,
          },
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });

  } catch (error) {
    console.error("Error saving profile:", error.message, error.stack);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
