import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(
      "https://homeintownback.hiteshstorehub.in/public/api/verify_otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();
    console.log(data, "OTP Verify");

    return NextResponse.json(
      {
        status: data.status,
        message: data.message,
        access_token: data.access_token,
        api_key: data.api_key,
        customer_details: data.customer_details,
      },
      { status: backendRes.status }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("API verify error:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
