import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendWelcomeKitEmail(
  to: string,
  customerName: string,
  pdfBuffer: Buffer,
  language: 'en' | 'he' = 'en'
) {
  try {
    // Bilingual email content
    const emailContent = language === 'he' ? {
      subject: '🇹🇭 ברוכים הבאים! חבילת התייר החכם שלך לתאילנד',
      from: 'Learn Thai Before You Fly <noreply@learnthaib4fly.com>',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.8;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              direction: rtl;
            }
            .header {
              background: linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              border-radius: 15px 15px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .header .flag {
              font-size: 60px;
              margin-bottom: 20px;
            }
            .content {
              background: white;
              padding: 40px 30px;
              border: 1px solid #E2E8F0;
              border-top: none;
            }
            .greeting {
              font-size: 20px;
              font-weight: 600;
              color: #0EA5E9;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 15px;
            }
            .features {
              background: #F8FAFC;
              padding: 25px;
              border-radius: 10px;
              margin: 30px 0;
            }
            .features h3 {
              color: #0EA5E9;
              margin-top: 0;
              margin-bottom: 15px;
            }
            .features ul {
              margin: 0;
              padding-right: 20px;
            }
            .features li {
              margin-bottom: 10px;
              font-size: 15px;
            }
            .footer {
              background: #F8FAFC;
              padding: 30px;
              text-align: center;
              border-radius: 0 0 15px 15px;
              border: 1px solid #E2E8F0;
              border-top: none;
            }
            .footer p {
              margin: 5px 0;
              font-size: 14px;
              color: #64748B;
            }
            .contact {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #E2E8F0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="flag">🇹🇭</div>
            <h1>חבילת התייר החכם לתאילנד</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">המדריך המלא שלך להרפתקה בטוחה ומהנה</p>
          </div>
          
          <div class="content">
            <p class="greeting">שלום ${customerName}! 👋</p>
            
            <p class="message">
              תודה שרכשת את <strong>חבילת התייר החכם לתאילנד</strong>! אנחנו נרגשים להיות חלק מההרפתקה שלך.
            </p>
            
            <p class="message">
              המדריך המקיף שלך בן 38 עמודים מצורף למייל הזה. הוא כולל את כל מה שאתה צריך לדעת לפני ובמהלך הטיול שלך לתאילנד.
            </p>
            
            <div class="features">
              <h3>📚 מה כלול במדריך:</h3>
              <ul>
                <li>✈️ מדריך הישרדות בהגעה - תחבורה מהשדה, ויזה, רשימת משימות</li>
                <li>🚨 הונאות נפוצות להימנע מהן - הגן על עצמך מתרמיות</li>
                <li>📱 מדריך כרטיסי SIM - השוואת ספקים ומחירים</li>
                <li>🚕 כללי תחבורה - Grab, Bolt, אופנועים, רכבות</li>
                <li>💰 החלפת כסף - איפה לקבל את השער הטוב ביותר</li>
                <li>🏨 מדריך לינה - מהוסטלים ועד אתרי נופש יוקרתיים</li>
                <li>🍜 אוכל ומסעדות - מנות חובה, בטיחות אוכל רחוב</li>
                <li>🌙 בטיחות בחיי לילה - טיפים לבילוי בטוח</li>
                <li>🛕 נימוסים במקדשים - קוד לבוש והתנהגות</li>
                <li>🛍️ קניות ומיקוח - איך למקח בנימוס</li>
                <li>🏖️ בטיחות בחוף - שחייה ופעילויות מים</li>
                <li>🗣️ ביטויים חיוניים בתאית - שיחה בסיסית</li>
                <li>📍 מסלול 3 ימים בבנגקוק - תכנון יום אחר יום</li>
                <li>🏔️ מסלול 3 ימים בצ'אנג מאי - מקדשים ופילים</li>
                <li>🚑 אנשי קשר חירום - שגרירות, משטרה, בתי חולים</li>
              </ul>
            </div>
            
            <p class="message">
              <strong>💡 טיפ:</strong> שמור את הקובץ בטלפון שלך לגישה מהירה במהלך הטיול!
            </p>
            
            <p class="message">
              יש לך שאלות? אנחנו כאן כדי לעזור! פשוט השב למייל הזה או צור קשר איתנו ב-WhatsApp.
            </p>
            
            <p class="message" style="margin-top: 30px;">
              נסיעה טובה ובטוחה! 🌴<br>
              <strong>צוות Learn Thai Before You Fly</strong>
            </p>
          </div>
          
          <div class="footer">
            <div class="contact">
              <p><strong>צור קשר</strong></p>
              <p>📱 WhatsApp: +66 92 989 4495</p>
              <p>📧 Email: Pasuthunjunkong@gmail.com</p>
              <p>🌐 Website: LearnThaiB4Fly.com</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
              © 2025 Learn Thai Before You Fly. כל הזכויות שמורות.
            </p>
          </div>
        </body>
        </html>
      `
    } : {
      subject: '🇹🇭 Welcome! Your Thailand Smart Tourist Pack is Here',
      from: 'Learn Thai Before You Fly <noreply@learnthaib4fly.com>',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.8;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              border-radius: 15px 15px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .header .flag {
              font-size: 60px;
              margin-bottom: 20px;
            }
            .content {
              background: white;
              padding: 40px 30px;
              border: 1px solid #E2E8F0;
              border-top: none;
            }
            .greeting {
              font-size: 20px;
              font-weight: 600;
              color: #0EA5E9;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 15px;
            }
            .features {
              background: #F8FAFC;
              padding: 25px;
              border-radius: 10px;
              margin: 30px 0;
            }
            .features h3 {
              color: #0EA5E9;
              margin-top: 0;
              margin-bottom: 15px;
            }
            .features ul {
              margin: 0;
              padding-left: 20px;
            }
            .features li {
              margin-bottom: 10px;
              font-size: 15px;
            }
            .footer {
              background: #F8FAFC;
              padding: 30px;
              text-align: center;
              border-radius: 0 0 15px 15px;
              border: 1px solid #E2E8F0;
              border-top: none;
            }
            .footer p {
              margin: 5px 0;
              font-size: 14px;
              color: #64748B;
            }
            .contact {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #E2E8F0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="flag">🇹🇭</div>
            <h1>Thailand Smart Tourist Pack</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your Complete Guide to a Safe & Amazing Adventure</p>
          </div>
          
          <div class="content">
            <p class="greeting">Hello ${customerName}! 👋</p>
            
            <p class="message">
              Thank you for purchasing the <strong>Thailand Smart Tourist Pack</strong>! We're excited to be part of your adventure.
            </p>
            
            <p class="message">
              Your comprehensive 38-page guide is attached to this email. It contains everything you need to know before and during your trip to Thailand.
            </p>
            
            <div class="features">
              <h3>📚 What's Included in Your Guide:</h3>
              <ul>
                <li>✈️ Arrival Survival Guide - Airport transport, visa info, first 24h checklist</li>
                <li>🚨 Top Scams to Avoid - Protect yourself from common tourist traps</li>
                <li>📱 SIM Card Guide - Provider comparison and pricing</li>
                <li>🚕 Transportation Rules - Grab, Bolt, motorbikes, trains</li>
                <li>💰 Money Exchange - Where to get the best rates</li>
                <li>🏨 Accommodation Guide - From hostels to luxury resorts</li>
                <li>🍜 Food & Restaurants - Must-try dishes, street food safety</li>
                <li>🌙 Nightlife Safety - Tips for safe partying</li>
                <li>🛕 Temple Etiquette - Dress code and behavior</li>
                <li>🛍️ Shopping & Bargaining - How to negotiate politely</li>
                <li>🏖️ Beach Safety - Swimming and water activities</li>
                <li>🗣️ Essential Thai Phrases - Basic conversation</li>
                <li>📍 3-Day Bangkok Itinerary - Day-by-day planning</li>
                <li>🏔️ 3-Day Chiang Mai Itinerary - Temples and elephants</li>
                <li>🚑 Emergency Contacts - Embassy, police, hospitals</li>
              </ul>
            </div>
            
            <p class="message">
              <strong>💡 Pro Tip:</strong> Save this file on your phone for quick access during your trip!
            </p>
            
            <p class="message">
              Have questions? We're here to help! Simply reply to this email or contact us on WhatsApp.
            </p>
            
            <p class="message" style="margin-top: 30px;">
              Have a safe and amazing trip! 🌴<br>
              <strong>The Learn Thai Before You Fly Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <div class="contact">
              <p><strong>Contact Us</strong></p>
              <p>📱 WhatsApp: +66 92 989 4495</p>
              <p>📧 Email: Pasuthunjunkong@gmail.com</p>
              <p>🌐 Website: LearnThaiB4Fly.com</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
              © 2025 Learn Thai Before You Fly. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `
    };

    const { data, error } = await getResend().emails.send({
      from: emailContent.from,
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
      attachments: [
        {
          filename: 'Thailand_Smart_Tourist_Pack_Premium.pdf',
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
    const { data, error } = await getResend().emails.send({
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
