import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeKitEmail(
  to: string,
  customerName: string,
  pdfBuffer: Buffer
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'LearnThaiB4Fly <noreply@learnthaib4fly.com>',
      to: [to],
      subject: 'Your Smart Tourist Pack is Ready! 🇹🇭',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌴 Welcome to Thailand!</h1>
              <p>Your Smart Tourist Pack is ready</p>
            </div>
            <div class="content">
              <p>Dear ${customerName},</p>
              
              <p>Thank you for purchasing the <strong>Smart Tourist Pack</strong>! You're now fully equipped for an amazing Thailand adventure.</p>
              
              <div class="highlight">
                <strong>📦 What's Included:</strong>
                <ul>
                  <li>Complete Welcome Kit PDF (attached)</li>
                  <li>24/7 AI Travel Concierge access</li>
                  <li>Arrival survival guide</li>
                  <li>Scam prevention tips</li>
                  <li>SIM card comparison</li>
                  <li>Transport & negotiation guides</li>
                  <li>Temple etiquette rules</li>
                </ul>
              </div>
              
              <p><strong>Your AI Concierge is ready!</strong></p>
              <p>Visit our website and click the chat bubble to get instant help with:</p>
              <ul>
                <li>Directions to any location in Chiang Mai</li>
                <li>Restaurant recommendations</li>
                <li>Custom itineraries</li>
                <li>Thai phrase translations</li>
                <li>Emergency assistance</li>
              </ul>
              
              <a href="https://learnthaib4fly.com" class="button">Access AI Concierge Now</a>
              
              <p><strong>Need help?</strong> Contact us anytime:</p>
              <p>
                WhatsApp: +66 92 989 4495<br>
                Email: support@learnthaib4fly.com
              </p>
              
              <p>Have an incredible trip! 🙏</p>
              <p>The LearnThaiB4Fly Team</p>
            </div>
            <div class="footer">
              <p>© 2024 LearnThaiB4Fly. All rights reserved.</p>
              <p>You received this email because you purchased the Smart Tourist Pack.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'Smart-Tourist-Pack-Welcome-Kit.pdf',
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    console.log('Welcome Kit email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send Welcome Kit email:', error);
    return { success: false, error };
  }
}

export async function sendBulkOrderInvoice(
  to: string,
  customerName: string,
  invoicePDF: Buffer,
  quantity: number
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'LearnThaiB4Fly <noreply@learnthaib4fly.com>',
      to: [to],
      subject: `Invoice for Bulk Order (${quantity} licenses)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Invoice - Bulk Order</h1>
            </div>
            <div class="content">
              <p>Dear ${customerName},</p>
              
              <p>Thank you for your bulk order of <strong>${quantity} Smart Tourist Pack licenses</strong>!</p>
              
              <p>Your invoice is attached to this email. Payment has been processed successfully.</p>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Download the attached invoice for your records</li>
                <li>We'll send license codes within 24 hours</li>
                <li>Distribute codes to your travelers</li>
                <li>They can activate at learnthaib4fly.com</li>
              </ul>
              
              <p>For white-label options or custom branding, please contact us:</p>
              <p>
                WhatsApp: +66 92 989 4495<br>
                Email: bulk@learnthaib4fly.com
              </p>
              
              <p>Thank you for your business!</p>
              <p>The LearnThaiB4Fly Team</p>
            </div>
            <div class="footer">
              <p>© 2024 LearnThaiB4Fly. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'Invoice.pdf',
          content: invoicePDF,
        },
      ],
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    console.log('Invoice email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return { success: false, error };
  }
}
