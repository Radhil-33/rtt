import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `
New Booking Request

Customer Details
-------------------------
Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}

Booking Details
-------------------------
Destination: ${body.destination}
Travel Date: ${body.travelDate}
Number of Travelers: ${body.travelers}
Package: ${body.packageName}

Additional Message
-------------------------
${body.message || 'No additional message'}
    `;

    const response = await resend.emails.send({
      from: 'Rashmi Tours Website <onboarding@resend.dev>',
      to: 'rashmitoursanddtravels@gmail.com',
      replyTo: body.email,
      subject: `New Booking from ${body.name}`,
      text: message,
    });

    console.log(response);

    if ((response as any).error) {
      return NextResponse.json(
        {
          success: false,
          message: (response as any).error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking enquiry sent successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send booking enquiry',
      },
      { status: 500 }
    );
  }
}