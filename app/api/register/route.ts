import { NextResponse } from "next/server";
import {
  appendRegistrationToSheet,
  isDuplicateEmailOrPhone,
  validateRegistrationPayload,
} from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validated = validateRegistrationPayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { message: validated.error },
        { status: validated.status }
      );
    }

    const { name, email, phone } = validated;
    const isDuplicate = await isDuplicateEmailOrPhone(email, phone);

    if (isDuplicate) {
      return NextResponse.json(
        {
          message:
            "You have already registered with this email or phone number.",
        },
        { status: 409 }
      );
    }

    const timestamp = new Date().toISOString();
    await appendRegistrationToSheet([timestamp, name, phone, email]);

    return NextResponse.json(
      { message: "Registration successful!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      { message: "Error saving registration data.", error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
