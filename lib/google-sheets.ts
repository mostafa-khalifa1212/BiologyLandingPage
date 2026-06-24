import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const FREE_NOTES_RANGE = "Sheet1!A:D";
const COURSE_REGISTRATION_RANGE =
  process.env.GOOGLE_COURSE_SHEET_RANGE ?? "CourseRegistrations!A:K";

function getGoogleCredentials() {
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!rawPrivateKey) {
    throw new Error("GOOGLE_PRIVATE_KEY environment variable is missing in Vercel settings.");
  }
  if (!clientEmail) {
    throw new Error("GOOGLE_CLIENT_EMAIL environment variable is missing in Vercel settings.");
  }

  let privateKey = rawPrivateKey.replace(/\\n/g, "\n");
  
  // Strip surrounding quotes if Vercel saved them as part of the string
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }

  privateKey = privateKey.trim();

  // If the key is formatted on a single line (no newlines at all), automatically restore standard PEM lines
  const headers = ["-----BEGIN PRIVATE KEY-----", "-----BEGIN RSA PRIVATE KEY-----"];
  const footers = ["-----END PRIVATE KEY-----", "-----END RSA PRIVATE KEY-----"];
  let matchedHeader = "";
  let matchedFooter = "";

  for (let i = 0; i < headers.length; i++) {
    if (privateKey.startsWith(headers[i]) && privateKey.endsWith(footers[i])) {
      matchedHeader = headers[i];
      matchedFooter = footers[i];
      break;
    }
  }

  if (matchedHeader && matchedFooter && !privateKey.includes("\n")) {
    const keyBody = privateKey.slice(matchedHeader.length, -matchedFooter.length).trim();
    const lines = [];
    for (let i = 0; i < keyBody.length; i += 64) {
      lines.push(keyBody.substring(i, i + 64));
    }
    privateKey = `${matchedHeader}\n${lines.join("\n")}\n${matchedFooter}`;
  }

  // Print safe diagnostics in the terminal (does not log the actual secret key content)
  console.log("== GOOGLE PRIVATE KEY DIAGNOSTICS ==");
  console.log("- Total Length:", privateKey.length);
  console.log("- Starts with header:", privateKey.startsWith("-----BEGIN PRIVATE KEY-----"));
  console.log("- Ends with footer:", privateKey.endsWith("-----END PRIVATE KEY-----"));
  console.log("- Contains literal '\\n' text:", privateKey.includes("\\n"));
  console.log("- Number of actual newlines:", (privateKey.match(/\n/g) || []).length);
  console.log("- First 50 chars:", JSON.stringify(privateKey.substring(0, 50)));
  console.log("- Last 50 chars:", JSON.stringify(privateKey.substring(privateKey.length - 50)));
  console.log("====================================");

  // Check for truncation (common when multi-line private keys are in .env without double quotes)
  if (!privateKey.includes("-----END PRIVATE KEY-----")) {
    throw new Error(
      "GOOGLE_PRIVATE_KEY is truncated or invalid (missing '-----END PRIVATE KEY-----'). " +
      "If you added this to a local .env file, please make sure the entire private key is enclosed in double quotes (e.g., GOOGLE_PRIVATE_KEY=\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\")."
    );
  }

  return {
    type: process.env.GOOGLE_TYPE || "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: clientEmail,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.GOOGLE_TOKEN_URI || "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN || "googleapis.com",
  };
}

function getSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is missing in Vercel settings.");
  }
  return spreadsheetId;
}

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: getGoogleCredentials(),
    scopes: SCOPES,
  });
}

function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getAuthClient() });
}

export async function appendRegistrationToSheet(
  data: [string, string, string, string]
): Promise<void> {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: FREE_NOTES_RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [data],
    },
  });
}

export async function isDuplicateEmailOrPhone(
  email: string,
  phone: string
): Promise<boolean> {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: FREE_NOTES_RANGE,
  });

  const rows = response.data.values ?? [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowPhone = row[2]?.trim() ?? "";
    const rowEmail = row[3]?.trim().toLowerCase() ?? "";

    if (
      (rowEmail && rowEmail === email.trim().toLowerCase()) ||
      (rowPhone && rowPhone === phone.trim())
    ) {
      return true;
    }
  }

  return false;
}

export type RegistrationPayload = {
  name: string;
  email: string;
  phone: string;
};

export function validateRegistrationPayload(
  body: unknown
): RegistrationPayload | { error: string; status: number } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body.", status: 400 };
  }

  const { name, email, phone } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required.", status: 400 };
  }

  if (typeof email !== "string" || !email.trim()) {
    return { error: "Email is required.", status: 400 };
  }

  if (typeof phone !== "string" || !phone.trim()) {
    return { error: "Phone number is required.", status: 400 };
  }

  return {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };
}

export type CourseRegistrationPayload = {
  course: string[];
  session: string;
  studentFullName: string;
  studentPhoneNumber: string;
  studentEmail: string;
  parentPhoneNumber: string;
  school: string;
  preference: string;
  grade: string;
  retake: string;
};

const COURSE_OPTIONS = ["AS Biology Cambridge", "A2 Biology Cambridge"] as const;
const SESSION_OPTIONS = ["November 2026", "June 2027"] as const;
const GRADE_OPTIONS = ["11", "12"] as const;
const RETAKE_OPTIONS = ["No, First time", "Yes, retake💔"] as const;
const PREFERENCE_OPTIONS = ["Online", "On Ground (Madinet Nasr)"] as const;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateCourseRegistrationPayload(
  body: unknown
): CourseRegistrationPayload | { error: string; status: number } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body.", status: 400 };
  }

  const data = body as Record<string, unknown>;

  if (!Array.isArray(data.course) || data.course.length === 0) {
    return { error: "Please select at least one course.", status: 400 };
  }

  const course = data.course.filter(
    (item): item is string =>
      typeof item === "string" &&
      (COURSE_OPTIONS as readonly string[]).includes(item)
  );

  if (course.length === 0) {
    return { error: "Please select a valid course option.", status: 400 };
  }

  if (
    !isNonEmptyString(data.session) ||
    !(SESSION_OPTIONS as readonly string[]).includes(data.session)
  ) {
    return { error: "Please select a valid session.", status: 400 };
  }

  if (!isNonEmptyString(data.studentFullName)) {
    return { error: "Student's full name is required.", status: 400 };
  }

  if (!isNonEmptyString(data.studentPhoneNumber)) {
    return { error: "Student's phone number is required.", status: 400 };
  }

  if (!isNonEmptyString(data.studentEmail)) {
    return { error: "Student's email is required.", status: 400 };
  }

  if (!isNonEmptyString(data.parentPhoneNumber)) {
    return { error: "Parent's phone number is required.", status: 400 };
  }

  if (!isNonEmptyString(data.school)) {
    return { error: "School is required.", status: 400 };
  }

  if (
    !isNonEmptyString(data.preference) ||
    !(PREFERENCE_OPTIONS as readonly string[]).includes(data.preference)
  ) {
    return { error: "Please select a valid preference.", status: 400 };
  }

  if (
    !isNonEmptyString(data.grade) ||
    !(GRADE_OPTIONS as readonly string[]).includes(data.grade)
  ) {
    return { error: "Please select a valid grade.", status: 400 };
  }

  if (
    !isNonEmptyString(data.retake) ||
    !(RETAKE_OPTIONS as readonly string[]).includes(data.retake)
  ) {
    return { error: "Please select a retake option.", status: 400 };
  }

  return {
    course,
    session: data.session.trim(),
    studentFullName: data.studentFullName.trim(),
    studentPhoneNumber: data.studentPhoneNumber.trim(),
    studentEmail: data.studentEmail.trim(),
    parentPhoneNumber: data.parentPhoneNumber.trim(),
    school: data.school.trim(),
    preference: data.preference.trim(),
    grade: data.grade.trim(),
    retake: data.retake.trim(),
  };
}

export async function appendCourseRegistrationToSheet(
  data: CourseRegistrationPayload
): Promise<void> {
  const sheets = getSheetsClient();
  const timestamp = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: COURSE_REGISTRATION_RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          timestamp,
          data.course.join(", "),
          data.session,
          data.studentFullName,
          data.studentPhoneNumber,
          data.studentEmail,
          data.parentPhoneNumber,
          data.school,
          data.preference,
          data.grade,
          data.retake,
        ],
      ],
    },
  });
}

export async function isDuplicateCourseRegistration(
  studentEmail: string,
  studentPhoneNumber: string
): Promise<boolean> {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: COURSE_REGISTRATION_RANGE,
  });

  const rows = response.data.values ?? [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowPhone = row[4]?.trim() ?? "";
    const rowEmail = row[5]?.trim().toLowerCase() ?? "";

    if (
      (rowEmail && rowEmail === studentEmail.trim().toLowerCase()) ||
      (rowPhone && rowPhone === studentPhoneNumber.trim())
    ) {
      return true;
    }
  }

  return false;
}
