import { NextResponse } from 'next/server';
import { Resend } from 'resend';
//import twilio from 'twilio';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
/*
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
*/
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `
New Tour Enquiry

Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Subject: ${body.subject}

Message:
${body.message}
    `;

    // SEND EMAIL
    const response = await resend.emails.send({
    from: `${body.name} <support@rashmitours.in>`,
    to: 'support@rashmitours.in',
    subject: body.subject || `New Enquiry from ${body.name}`,
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
/*
    // SEND WHATSAPP
await twilioClient.messages.create({
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+918610251897',

  contentSid: 'YOUR_CONTENT_SID',

  contentVariables: JSON.stringify({
    1: body.name,
    2: body.phone,
    3: body.email,
    4: body.subject,
    5: body.message,
  }),
});
*/

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message',
      },
      { status: 500 }
    );
  }
}