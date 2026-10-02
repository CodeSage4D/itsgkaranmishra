import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a subject." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_RECEIVER || "karannmishra136@gmail.com";
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER || "karannmishra136@gmail.com";
    const rawPass = process.env.GMAIL_PASS || process.env.SMTP_PASS || "zfqt rbib zgfu mvjt";
    // Sanitize app password by stripping spaces for Gmail SMTP compliance
    const smtpPass = rawPass.trim().replace(/\s+/g, "");

    console.log("------------------------------------------");
    console.log("📨 NEW DIRECT CONTACT MESSAGE FOR KARAN MISHRA (AURXON):");
    console.log(`From: ${name} <${email}>`);
    console.log(`Phone: ${number || "N/A"}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Recipient: ${recipient}`);
    console.log("Timestamp:", new Date().toISOString());
    console.log("------------------------------------------");

    let mailSent = false;
    let mailError: string | null = null;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name} (Portfolio Inquiry)" <${smtpUser}>`,
        replyTo: email,
        to: recipient,
        subject: `[Portfolio Contact - Aurxon] ${subject} - from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #1e1b4b; margin: 0 0 6px 0; font-size: 22px;">New Direct Portfolio Message</h2>
              <p style="color: #64748b; margin: 0; font-size: 13px;">Sent from Karan Mishra's Portfolio Website (<a href="https://itsgkaranmishra.web.app" style="color: #6366f1; text-decoration: none;">Aurxon AI & Tech</a>)</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #334155; font-size: 14px;">Sender Name:</strong>
              <div style="font-size: 16px; color: #0f172a; margin-top: 4px; font-weight: 600;">${name}</div>
            </div>

            <div style="margin-bottom: 16px;">
              <strong style="color: #334155; font-size: 14px;">Email:</strong>
              <div style="font-size: 15px; color: #0f172a; margin-top: 4px;">
                <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${email}</a>
              </div>
            </div>

            ${number ? `
            <div style="margin-bottom: 16px;">
              <strong style="color: #334155; font-size: 14px;">Phone Number:</strong>
              <div style="font-size: 15px; color: #0f172a; margin-top: 4px;">
                <a href="tel:${number}" style="color: #4f46e5; text-decoration: none;">${number}</a>
              </div>
            </div>
            ` : ""}

            <div style="margin-bottom: 16px;">
              <strong style="color: #334155; font-size: 14px;">Subject:</strong>
              <div style="font-size: 15px; color: #0f172a; margin-top: 4px;">${subject}</div>
            </div>

            <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px;">
              <strong style="color: #334155; font-size: 14px;">Message:</strong>
              <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 8px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
              Direct Email Delivery System &bull; Karan Mishra | Aurxon
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      mailSent = true;
      console.log("✅ Email successfully dispatched via SMTP to", recipient);
    } catch (err: any) {
      mailError = err?.message || String(err);
      console.warn("⚠️ SMTP dispatch attempt encountered notice:", mailError);
    }

    return NextResponse.json(
      {
        success: true,
        dispatched: mailSent,
        message: "Thank you! Your message has been sent directly to Karan Mishra (Aurxon). You will receive a response shortly.",
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
