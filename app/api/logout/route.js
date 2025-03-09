import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb"; // MongoDB कनेक्शन

export async function POST(request) {
  try {
    const { phoneNumber, isLogin } = await request.json();

    // फ़ोन नंबर और isLogin की वैधता जांचें
    if (!phoneNumber) {
      console.error("फ़ोन नंबर प्रदान नहीं किया गया।");
      return NextResponse.json(
        { message: "फ़ोन नंबर प्रदान नहीं किया गया।" },
        { status: 400 }
      );
    }

    if (typeof isLogin !== 'boolean') {
      console.error("isLogin की वैधता जांचें (boolean होना चाहिए)।");
      return NextResponse.json(
        { message: "isLogin की वैधता जांचें (boolean होना चाहिए)।" },
        { status: 400 }
      );
    }

    console.log("MongoDB अपडेट के लिए फ़ोन नंबर:", phoneNumber);

    // MongoDB से कनेक्ट करें
    const client = await clientPromise;
    const db = client.db(); // डिफ़ॉल्ट डेटाबेस
    const usersCollection = db.collection("otps"); // यूज़र्स कलेक्शन

    // MongoDB में isLogin को false सेट करें
    const updateResult = await usersCollection.updateOne(
      { phoneNumber: phoneNumber }, // सही फोन नंबर से मिलान करें
      { $set: { isLogin: isLogin } }
    );

    // अपडेट रिजल्ट देखें
    console.log("MongoDB Update Result:", updateResult);

    if (updateResult.matchedCount === 0) {
      console.error("MongoDB: कोई भी डॉक्यूमेंट नहीं मिला।");
      return NextResponse.json(
        { message: "फ़ोन नंबर नहीं मिला।" },
        { status: 404 }
      );
    }

    if (updateResult.modifiedCount === 0) {
      console.log("MongoDB: isLogin को अपडेट नहीं किया गया।");
    } else {
      console.log("MongoDB: isLogin सफलतापूर्वक अपडेट किया गया।");
    }

    // कुकी को हटाने के लिए प्रतिक्रिया तैयार करें
    const response = NextResponse.json({
      message: "लॉगआउट सफल रहा।",
    });

    // 'loggedInPhoneNumber' कुकी को हटाना
    response.cookies.set("loggedInPhoneNumber", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // समाप्ति तिथि शून्य पर सेट करें
    });

    console.log("कुकी 'loggedInPhoneNumber' सफलतापूर्वक हटा दी गई।");

    return response;
  } catch (error) {
    console.error("लॉगआउट एपीआई में त्रुटि:", error.message || error);
    return NextResponse.json(
      { message: "लॉगआउट के दौरान सर्वर त्रुटि हुई।", error: error.message || error },
      { status: 500 }
    );
  }
}
