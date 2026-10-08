import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(3).max(200),
  message: z.string().min(20).max(5000),
});

/** Escape user input before interpolating it into the email HTML. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // Validate request body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  };

  // Env check — return a helpful 503 instead of silently failing
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. Set RESEND_API_KEY and CONTACT_EMAIL environment variables.",
      },
      { status: 503 }
    );
  }

  // Send via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject.replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#e2481b;margin-bottom:4px">New message from your portfolio</h2>
          <p style="color:#64748b;margin-top:0">Submitted via the contact form</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#64748b;width:80px">Name</td><td style="padding:6px 0;font-weight:600">${safe.name}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${safe.email}" style="color:#e2481b">${safe.email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Subject</td><td style="padding:6px 0">${safe.subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
          <h3 style="color:#0f172a;margin-bottom:8px">Message</h3>
          <p style="color:#334155;line-height:1.6;white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
