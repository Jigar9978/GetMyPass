export async function GET(request) {
    const phoneNumberCookie = request.cookies.get("loggedInPhoneNumber");
    console.log(phoneNumberCookie);

    if (!phoneNumberCookie) {
        return new Response(JSON.stringify({ message: "No phone number found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const phoneNumber = phoneNumberCookie.value;

    return new Response(JSON.stringify({ phoneNumber }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
