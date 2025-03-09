import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get the logged-in phone number from cookies
    const loggedInPhoneNumber = req.cookies.get("loggedInPhoneNumber");

    // Check the login status from the custom header sent by the client
    const isLocalLoggedIn = req.headers.get("X-Local-Login-Status") === "true"; // Check the login status from localStorage

    // If the user is not logged in via cookies or the localStorage check
    if (!loggedInPhoneNumber && !isLocalLoggedIn) {
      return NextResponse.json({ loggedIn: false, message: "Not logged in" }, { status: 401 });
    }

    // If the user is logged in, return the response with logged-in status
    return NextResponse.json({ loggedIn: true, phoneNumber: loggedInPhoneNumber });
  } catch (error) {
    console.error("Error in check-login:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
