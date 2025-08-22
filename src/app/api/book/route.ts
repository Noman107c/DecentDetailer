import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, vehicleMake, vehicleModel, vehicleYear, vehicleColor, date, timeSlot } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Confirmation email to client
    await transporter.sendMail({
      from: `"Detail Drive Shine" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Booking Confirmation - Detail Drive Shine",
      html: `
        <h2>Thank you for booking, ${firstName}!</h2>
        <p>Your appointment has been scheduled.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleColor})</p>
      `,
    });

    // Notification email to admin
    await transporter.sendMail({
      from: `"Booking System" <${process.env.EMAIL_USER}>`,
      to: "mkhalidh61@gmail.com", 
      subject: `New Booking from ${firstName} ${lastName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleColor})</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
      `,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json({ message: "Failed to send emails", error: error.message }, { status: 500 });
  }
}
