import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

export async function generateWelcomeKitPDF(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Cover Page
    doc.fontSize(32).font('Helvetica-Bold').text('Smart Tourist Pack', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('Complete Thailand Travel Guide', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).font('Helvetica').text('For Israeli Travelers', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).text('© 2024 LearnThaiB4Fly', { align: 'center' });
    
    doc.addPage();

    // Table of Contents
    doc.fontSize(24).font('Helvetica-Bold').text('Table of Contents');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    const toc = [
      '1. Arrival Survival Guide',
      '2. Top Scams to Avoid',
      '3. SIM Card Guide',
      '4. Transport Rules & Apps',
      '5. How to Negotiate Politely',
      '6. Temple Etiquette',
    ];
    toc.forEach((item) => {
      doc.text(item);
      doc.moveDown(0.5);
    });

    doc.addPage();

    // Module 1: Arrival Survival Guide
    doc.fontSize(20).font('Helvetica-Bold').text('1. Arrival Survival Guide');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    
    doc.text('Welcome to Thailand! Here\'s everything you need for a smooth arrival:');
    doc.moveDown();
    
    doc.font('Helvetica-Bold').text('Airport to City:');
    doc.font('Helvetica');
    doc.text('• Airport Rail Link (฿45): Fast train to city center');
    doc.text('• Metered Taxi (฿300-400): Use meter, avoid flat rates');
    doc.text('• Grab/Bolt App: Pre-booked rides with fixed prices');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('First 24 Hours Checklist:');
    doc.font('Helvetica');
    doc.text('✓ Get Thai SIM card at airport (see Module 3)');
    doc.text('✓ Exchange money at SuperRich (better rates than airport)');
    doc.text('✓ Download Grab, Bolt, Google Maps');
    doc.text('✓ Save emergency numbers: Tourist Police 1155');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Money Tips:');
    doc.font('Helvetica');
    doc.text('• ATMs charge ฿220 fee - withdraw large amounts');
    doc.text('• Notify your bank before traveling');
    doc.text('• Keep small bills (฿20, ฿50) for street vendors');
    doc.text('• Credit cards accepted in malls, not street markets');

    doc.addPage();

    // Module 2: Top Scams to Avoid
    doc.fontSize(20).font('Helvetica-Bold').text('2. Top Scams to Avoid');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');

    const scams = [
      {
        title: 'Tuk-Tuk "Temple Closed" Scam',
        description: 'Driver says temple is closed, offers tour to gem shop. Reality: Temple is open, they get commission.',
        solution: 'Check temple hours online. Politely decline detours.'
      },
      {
        title: 'Jet Ski Damage Scam',
        description: 'Rental shop claims you damaged jet ski, demands ฿50,000.',
        solution: 'Take photos/video before renting. Use reputable shops only.'
      },
      {
        title: 'Taxi Meter "Broken"',
        description: 'Driver refuses to use meter, quotes inflated flat rate.',
        solution: 'Insist on meter or use Grab/Bolt app instead.'
      },
      {
        title: 'Ping Pong Show Overcharge',
        description: 'Advertised as free, then charged ฿5,000+ for drinks.',
        solution: 'Avoid these shows. If curious, ask for price list first.'
      }
    ];

    scams.forEach((scam) => {
      doc.font('Helvetica-Bold').fillColor('red').text(`⚠ ${scam.title}`);
      doc.font('Helvetica').fillColor('black');
      doc.text(`Problem: ${scam.description}`);
      doc.fillColor('green').text(`✓ Solution: ${scam.solution}`);
      doc.fillColor('black').moveDown();
    });

    doc.addPage();

    // Module 3: SIM Card Guide
    doc.fontSize(20).font('Helvetica-Bold').text('3. SIM Card Guide');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');

    doc.text('Get a Thai SIM card immediately at the airport for navigation and communication.');
    doc.moveDown();

    const simCards = [
      { provider: 'AIS', price: '฿299-599', data: '15-50GB', speed: 'Fastest 5G', best: 'Cities & islands' },
      { provider: 'DTAC', price: '฿249-499', data: '10-40GB', speed: 'Good 4G/5G', best: 'Budget travelers' },
      { provider: 'True', price: '฿299-699', data: '20-unlimited', speed: 'Reliable 4G', best: 'Heavy users' }
    ];

    doc.font('Helvetica-Bold').text('Comparison Table:');
    doc.moveDown(0.5);

    simCards.forEach((sim) => {
      doc.font('Helvetica-Bold').text(sim.provider);
      doc.font('Helvetica');
      doc.text(`  Price: ${sim.price} | Data: ${sim.data}`);
      doc.text(`  Speed: ${sim.speed} | Best for: ${sim.best}`);
      doc.moveDown(0.5);
    });

    doc.moveDown();
    doc.font('Helvetica-Bold').text('How to Buy:');
    doc.font('Helvetica');
    doc.text('1. Find SIM card booth in airport arrivals hall');
    doc.text('2. Show passport (required by law)');
    doc.text('3. Choose tourist package (7-30 days)');
    doc.text('4. Staff will install and activate for you');
    doc.text('5. Test by calling hotel or using Google Maps');

    doc.addPage();

    // Module 4: Transport Rules
    doc.fontSize(20).font('Helvetica-Bold').text('4. Transport Rules & Apps');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');

    doc.font('Helvetica-Bold').text('Grab & Bolt (Ride-hailing Apps):');
    doc.font('Helvetica');
    doc.text('• Download both apps for best prices');
    doc.text('• Payment: Cash or credit card');
    doc.text('• Tip: Compare prices before booking');
    doc.text('• Safety: Share trip with friend via app');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Taxis:');
    doc.font('Helvetica');
    doc.text('• Always insist on meter ("meter krap/ka")');
    doc.text('• Starting fare: ฿35-40');
    doc.text('• Airport surcharge: ฿50');
    doc.text('• Expressway tolls: ฿25-75 (you pay)');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Tuk-Tuks:');
    doc.font('Helvetica');
    doc.text('• Negotiate price BEFORE entering');
    doc.text('• Typical short ride: ฿60-100');
    doc.text('• Tourist areas charge more');
    doc.text('• Fun experience but not always cheaper');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Motorbike Rental:');
    doc.font('Helvetica');
    doc.text('⚠ IMPORTANT: International Driving Permit required!');
    doc.text('• Rental: ฿150-300/day');
    doc.text('• Always wear helmet (฿500 fine)');
    doc.text('• Insurance: Get full coverage');
    doc.text('• Traffic: Drive on LEFT side');
    doc.text('• Parking: NOT allowed in middle of road');

    doc.addPage();

    // Module 5: Negotiation
    doc.fontSize(20).font('Helvetica-Bold').text('5. How to Negotiate Politely');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');

    doc.text('Bargaining is expected in markets but not in malls or restaurants.');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Where to Bargain:');
    doc.font('Helvetica');
    doc.text('✓ Street markets, night markets');
    doc.text('✓ Tuk-tuks, long-tail boats');
    doc.text('✓ Souvenir shops');
    doc.text('✗ 7-Eleven, malls, restaurants');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Negotiation Phrases:');
    doc.font('Helvetica');
    doc.text('• "Tao rai krap/ka?" (How much?)');
    doc.text('• "Paeng pai!" (Too expensive!)');
    doc.text('• "Lot dai mai?" (Can you reduce?)');
    doc.text('• "Ao... baht dai mai?" (Can I have it for... baht?)');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Tips for Success:');
    doc.font('Helvetica');
    doc.text('1. Start at 50-60% of asking price');
    doc.text('2. Smile and stay friendly');
    doc.text('3. Walk away if too expensive (they often call you back)');
    doc.text('4. Buy multiple items for better discount');
    doc.text('5. Shop late evening for best deals');

    doc.addPage();

    // Module 6: Temple Etiquette
    doc.fontSize(20).font('Helvetica-Bold').text('6. Temple Etiquette');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');

    doc.font('Helvetica-Bold').text('Dress Code (STRICTLY ENFORCED):');
    doc.font('Helvetica');
    doc.text('✓ Cover shoulders (no tank tops)');
    doc.text('✓ Cover knees (no shorts)');
    doc.text('✓ Remove shoes before entering buildings');
    doc.text('✗ No revealing clothing');
    doc.text('✗ No beach wear');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Behavior Rules:');
    doc.font('Helvetica');
    doc.text('• Speak quietly and respectfully');
    doc.text('• Don\'t point feet at Buddha images');
    doc.text('• Women: Never touch monks');
    doc.text('• Don\'t climb on Buddha statues');
    doc.text('• Ask before taking photos of people praying');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Popular Temples & Entry Fees:');
    doc.font('Helvetica');
    doc.text('• Wat Phra Kaew (Bangkok): ฿500');
    doc.text('• Wat Pho (Bangkok): ฿200');
    doc.text('• Wat Arun (Bangkok): ฿100');
    doc.text('• Wat Phra That Doi Suthep (Chiang Mai): ฿30');
    doc.text('• White Temple (Chiang Rai): Free');
    doc.moveDown();

    doc.font('Helvetica-Bold').text('The Wai Greeting:');
    doc.font('Helvetica');
    doc.text('Press palms together at chest level, slight bow.');
    doc.text('Use when: Greeting, thanking, apologizing.');
    doc.text('Higher hands = more respect (monks, elders).');

    doc.addPage();

    // Contact & Support
    doc.fontSize(20).font('Helvetica-Bold').text('Need More Help?');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    
    doc.text('Your Smart Tourist Pack includes 24/7 AI Concierge support!');
    doc.moveDown();
    
    doc.text('Contact us:');
    doc.text('WhatsApp: +66 92 989 4495');
    doc.text('Website: LearnThaiB4Fly.com');
    doc.moveDown();
    
    doc.text('Emergency Numbers:');
    doc.text('Tourist Police: 1155');
    doc.text('Emergency: 191');
    doc.text('Ambulance: 1669');
    doc.moveDown(2);
    
    doc.fontSize(10).text('Thank you for choosing Smart Tourist Pack!', { align: 'center' });
    doc.text('Have an amazing trip in Thailand! 🇹🇭', { align: 'center' });

    doc.end();
  });
}

export async function generateInvoicePDF(purchase: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Invoice Header
    doc.fontSize(28).font('Helvetica-Bold').text('INVOICE', { align: 'right' });
    doc.moveDown();
    
    doc.fontSize(12).font('Helvetica');
    doc.text('LearnThaiB4Fly', { align: 'left' });
    doc.text('Smart Tourist Pack', { align: 'left' });
    doc.text('Thailand', { align: 'left' });
    doc.moveDown();

    // Invoice Details
    doc.text(`Invoice Date: ${new Date(purchase.createdAt).toLocaleDateString()}`);
    doc.text(`Invoice #: ${purchase.id}`);
    doc.text(`Payment ID: ${purchase.stripeSessionId}`);
    doc.moveDown(2);

    // Customer Details
    doc.fontSize(14).font('Helvetica-Bold').text('Bill To:');
    doc.fontSize(12).font('Helvetica');
    doc.text(purchase.customerName || 'Customer');
    doc.text(purchase.customerEmail);
    doc.moveDown(2);

    // Items Table
    doc.fontSize(14).font('Helvetica-Bold').text('Items:');
    doc.moveDown(0.5);
    
    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Description', 50, tableTop);
    doc.text('Quantity', 300, tableTop);
    doc.text('Amount', 450, tableTop, { align: 'right' });
    
    doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();
    
    doc.fontSize(10).font('Helvetica');
    const itemY = tableTop + 30;
    doc.text(purchase.productType.replace('_', ' ').toUpperCase(), 50, itemY);
    doc.text('1', 300, itemY);
    doc.text(`฿${(purchase.amount / 100).toFixed(2)}`, 450, itemY, { align: 'right' });
    
    doc.moveDown(3);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    
    // Total
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Total:', 350, doc.y);
    doc.text(`฿${(purchase.amount / 100).toFixed(2)}`, 450, doc.y, { align: 'right' });
    
    doc.moveDown(2);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Payment Status: ${purchase.status.toUpperCase()}`, { align: 'center' });
    doc.text('Thank you for your purchase!', { align: 'center' });

    doc.end();
  });
}
