import { NextResponse } from "next/server";
import {
  appendCourseRegistrationToSheet,
  isDuplicateCourseRegistration,
  validateCourseRegistrationPayload,
} from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validated = validateCourseRegistrationPayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { message: validated.error },
        { status: validated.status }
      );
    }

    const isDuplicate = await isDuplicateCourseRegistration(
      validated.studentEmail,
      validated.studentPhoneNumber
    );

    if (isDuplicate) {
      return NextResponse.json(
        {
          message:
            "You have already registered with this student email or phone number.",
        },
        { status: 409 }
      );
    }

    await appendCourseRegistrationToSheet(validated);

    return NextResponse.json(
      { message: "Course registration successful!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Course registration API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      { message: "Error saving course registration.", error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
