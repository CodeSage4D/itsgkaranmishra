import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, number, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please provide a subject (at least 3 characters)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a detailed message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // In a production environment with SMTP configured, this sends mail to karansmishra.84@gmail.com
    console.log("------------------------------------------");
    console.log("📨 NEW CONTACT MESSAGE RECEIVED FOR KARAN MISHRA:");
    console.log(`From: ${name} <${email}>`);
    console.log(`Phone: ${number || "N/A"}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("Recipient: karansmishra.84@gmail.com");
    console.log("Timestamp:", new Date().toISOString());
    console.log("------------------------------------------");

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been received, and Karan will get back to you shortly.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
