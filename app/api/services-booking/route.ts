import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const emailContent = `
New Hotel & Restaurant Booking Enquiry

Customer Details
-------------------------
Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email || 'Not Provided'}

Reservation Details
-------------------------
Service Type: ${body.serviceType}
Preferred Destination: ${body.destination}
Travel/Check-in Date: ${body.date}
Number of Guests: ${body.guests}
Budget Preference: ${body.budget}

Special Instructions / Notes
-------------------------
${body.message || 'No special requirements.'}

-------------------------
Submitted via Rashmi Tours Website Services Booking Form
`;

    const response = await resend.emails.send({
      from: 'Rashmi Tours Website <bookings@rashmitours.in>',
      to: 'bookings@rashmitours.in',
      replyTo: body.email || undefined,
      subject: `[Service Booking] ${body.serviceType.toUpperCase()} - ${body.name}`,
      text: emailContent,
    });

    console.log('Resend Response:', response);

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
  } catch (error: any) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to send booking enquiry',
      },
      { status: 500 }
    );
  }
}
