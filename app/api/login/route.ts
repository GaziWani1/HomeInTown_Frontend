import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(
      "https://homeintownback.hiteshstorehub.in/public/api/login_customer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();
    console.log(data, "OTP");

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("API login error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
