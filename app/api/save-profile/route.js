import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

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

    console.log("Form Data:", {
      email,
      phoneNumber,
      firstName,
      lastName,
      dob,
      gender,
      house,
      street,
      locality,
      city,
      state,
      pincode,
    });

    if (!email || !phoneNumber || !firstName || !lastName || !dob || !gender || !house || !street || !locality || !city || !state || !pincode) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // 🟢 Image Upload to Cloudinary
    const avatar = formData.get("avatar");  // Avatar URL should be received here
    console.log("Avatar URL received in backend:", avatar);
    
    // 🟢 MongoDB se कनेक्ट करें
    const { db } = await connectToDatabase();
    
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
            avatar: avatar || null,  // Avoid overriding with null
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
    
    console.log("Updated Profile:", updatedProfile);
    
    return NextResponse.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });
    
    return NextResponse.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });

  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
