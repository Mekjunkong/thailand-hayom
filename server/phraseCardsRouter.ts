import { Router, Request, Response } from "express";
import { lessonsData } from "../client/src/data/lessonsData";

const router = Router();

// Generate HTML for phrase cards PDF
router.get("/api/phrase-cards/generate", async (req: Request, res: Response) => {
  try {
    // Collect all phrases from all lessons
    const allPhrases: Array<{
      thai: string;
      phonetic: string;
      english: string;
      hebrew: string;
      lessonTitle: string;
    }> = [];

    lessonsData.forEach(lesson => {
      lesson.phrases.forEach(phrase => {
        allPhrases.push({
          thai: phrase.thai,
          phonetic: phrase.phonetic,
          english: phrase.english,
          hebrew: phrase.hebrew,
          lessonTitle: lesson.title,
        });
      });
    });

    // Generate HTML for printable cards
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thai Phrase Cards - Learn Thai B4Fly</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: white;
      padding: 20px;
    }

    .cards-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      border: 2px solid #0EA5E9;
      border-radius: 12px;
      padding: 20px;
      background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      page-break-inside: avoid;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-front {
      border-color: #0EA5E9;
    }

    .card-back {
      border-color: #10B981;
      background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
    }

    .card-header {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .thai-text {
      font-size: 36px;
      font-weight: bold;
      color: #0EA5E9;
      margin-bottom: 10px;
      text-align: center;
    }

    .phonetic-text {
      font-size: 18px;
      color: #64748b;
      font-style: italic;
      text-align: center;
      margin-bottom: 15px;
    }

    .english-text {
      font-size: 20px;
      color: #1e293b;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
    }

    .hebrew-text {
      font-family: 'Heebo', sans-serif;
      font-size: 18px;
      color: #64748b;
      text-align: center;
      direction: rtl;
    }

    .lesson-tag {
      font-size: 10px;
      color: #94a3b8;
      text-align: center;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
    }

    @media print {
      body {
        padding: 10px;
      }

      .cards-container {
        gap: 15px;
      }

      .card {
        page-break-inside: avoid;
      }
    }

    @page {
      size: A4;
      margin: 15mm;
    }

    .cover-page {
      text-align: center;
      padding: 60px 20px;
      page-break-after: always;
    }

    .cover-title {
      font-size: 48px;
      font-weight: bold;
      color: #0EA5E9;
      margin-bottom: 20px;
    }

    .cover-subtitle {
      font-size: 24px;
      color: #64748b;
      margin-bottom: 40px;
    }

    .cover-info {
      font-size: 16px;
      color: #94a3b8;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-title">🇹🇭 Thai Phrase Cards</div>
    <div class="cover-subtitle">Learn Thai Before You Fly</div>
    <div class="cover-info">
      <p><strong>${allPhrases.length} Essential Phrases</strong></p>
      <p>Printable flashcards for Israeli travelers</p>
      <p>Cut along the borders and practice anywhere!</p>
      <br>
      <p style="font-size: 14px;">
        <strong>How to use:</strong><br>
        1. Print this document (double-sided recommended)<br>
        2. Cut along the card borders<br>
        3. Practice Thai → English/Hebrew<br>
        4. Flip cards to check your answers
      </p>
    </div>
  </div>

  <!-- Front sides (Thai + Phonetic) -->
  <div class="cards-container">
    ${allPhrases.map((phrase, index) => `
      <div class="card card-front">
        <div>
          <div class="card-header">Card ${index + 1} - Front</div>
          <div class="thai-text">${phrase.thai}</div>
          <div class="phonetic-text">${phrase.phonetic}</div>
        </div>
        <div class="lesson-tag">${phrase.lessonTitle}</div>
      </div>
    `).join('')}
  </div>

  <!-- Page break -->
  <div style="page-break-after: always;"></div>

  <!-- Back sides (English + Hebrew) -->
  <div class="cards-container">
    ${allPhrases.map((phrase, index) => `
      <div class="card card-back">
        <div>
          <div class="card-header">Card ${index + 1} - Back</div>
          <div class="english-text">${phrase.english}</div>
          <div class="hebrew-text">${phrase.hebrew}</div>
        </div>
        <div class="lesson-tag">${phrase.lessonTitle}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error("[Phrase Cards] Error generating cards:", error);
    res.status(500).json({ error: "Failed to generate phrase cards" });
  }
});

export default router;
