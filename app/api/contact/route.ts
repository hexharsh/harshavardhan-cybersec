import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: "paliviriharshavardhan1998@gmail.com",
    replyTo: email,
    subject: `[New Inquiry] Security Consultation — Harshavardhan P | ${subject}`,
    html: `
      <div style="font-family:monospace;background:#050505;color:#00FF88;padding:24px;border-radius:8px;border:1px solid #00FF88">
        <h2 style="color:#00FF88;margin-top:0">New Contact — Portfolio</h2>
        <p><strong style="color:#00E5FF">Name:</strong> <span style="color:#fff">${name}</span></p>
        <p><strong style="color:#00E5FF">Email:</strong> <span style="color:#fff">${email}</span></p>
        <p><strong style="color:#00E5FF">Subject:</strong> <span style="color:#fff">${subject}</span></p>
        <hr style="border-color:#00FF8833;margin:16px 0"/>
        <p><strong style="color:#00E5FF">Message:</strong></p>
        <p style="color:#ccc;white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
