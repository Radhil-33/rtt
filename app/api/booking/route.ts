import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `
New Booking Request

Customer Details
-------------------------
Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email || 'N/A'}

Booking Details
-------------------------
Route: ${body.from} → ${body.to}
Travel Date: ${body.travelDate}
Pickup Time: ${body.pickupTime || 'N/A'}
Trip Type: ${body.tripType === 'round' ? 'Round Trip' : 'One Way'}
Vehicle Type: ${body.vehicle}
Passengers: ${body.passengers}
Estimated Fare: ₹${body.estimatedFare}

Coupon: ${body.coupon || 'None'}
Discount: ₹${body.discount || 0}

Additional Notes
-------------------------
${body.message || 'No additional message'}
    `;

    const response = await resend.emails.send({
      from: 'Rashmi Tours Website <bookings@rashmitours.in>',
      to: 'bookings@rashmitours.in',
      replyTo: body.email || undefined,
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