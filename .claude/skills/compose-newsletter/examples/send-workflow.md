# Complete Newsletter Send Workflow Example

This document shows a complete end-to-end example of composing and sending a newsletter using the compose-newsletter skill.

## Scenario

**Date**: January 28, 2026
**Goal**: Send weekly newsletter with new articles and upcoming events
**Tier**: All subscribers (free + premium)
**Content**: 3 articles, 2 events, custom announcement

---

## Step 1: Fetch Available Content

**User says**: "I want to send a newsletter"

**Claude activates skill and runs**:
```typescript
const articles = await trpc.article.list.query({
  page: 1,
  limit: 20,
  isPublished: true,
});

const events = await trpc.event.list.query({
  page: 1,
  limit: 10,
  upcoming: true,
});
```

**Output shown to user**:
```
📰 Available Published Articles (12):

1. [ID: 5] Best Vegan Restaurants in Chiang Mai | המסעדות הטבעוניות הטובות ביותר
   Published: Jan 20, 2026 | Category: food | Premium: No

2. [ID: 8] Thailand Visa Update 2026 | עדכון ויזה לתאילנד 2026
   Published: Jan 18, 2026 | Category: visa | Premium: No

3. [ID: 12] Songkran Festival 2026 Guide | מדריך פסטיבל סונגקראן 2026
   Published: Jan 15, 2026 | Category: events | Premium: Yes ⭐

4. [ID: 14] Hidden Temples in Chiang Mai | מקדשים נסתרים בצ'אנג מאי
   Published: Jan 10, 2026 | Category: attractions | Premium: Yes ⭐

... (8 more articles)

📅 Upcoming Events (5):

1. [ID: 15] Digital Nomad Meetup | מפגש נוודים דיגיטליים
   Date: Feb 15, 2026 | Price: Free | Premium: No

2. [ID: 18] VIP Songkran Pool Party | מסיבת בריכה VIP
   Date: Apr 13, 2026 | Price: ₪299 | Premium: Yes ⭐

... (3 more events)
```

---

## Step 2: Content Selection

**Claude asks**: "Which articles would you like to include? (Enter IDs separated by commas)"

**User responds**: "5, 8, 12"

**Claude validates**:
```typescript
// Check IDs exist and have bilingual content
const selectedArticles = articles.filter(a => [5, 8, 12].includes(a.id));

// Validate bilingual fields
for (const article of selectedArticles) {
  if (!article.titleHe) {
    console.warn(`⚠️ Article #${article.id} missing Hebrew title`);
  }
  if (!article.excerptHe) {
    console.warn(`⚠️ Article #${article.id} missing Hebrew excerpt`);
  }
}
```

**Output**:
```
✅ Selected 3 articles:
   - #5: Best Vegan Restaurants (free)
   - #8: Thailand Visa Update (free)
   - #12: Songkran Festival Guide (premium) ⭐

⚠️ Article #12 is premium content
   This will be visible to all tiers but marked with premium badge
```

**Claude asks**: "Which events would you like to include? (Enter IDs separated by commas, or 'none')"

**User responds**: "15, 18"

**Output**:
```
✅ Selected 2 events:
   - #15: Digital Nomad Meetup (free)
   - #18: VIP Songkran Pool Party (premium) ⭐
```

**Claude asks**: "Any custom content to add? (Hebrew text, or 'skip')"

**User responds**:
```
האביב הגיע! אנחנו נרגשים לשתף את ההמלצות המובילות שלנו לשבוע זה.
אל תפספסו את המדריך הבלעדי שלנו לפסטיבל סונגקראן.
```

**Claude asks**: "Any custom content to add? (English text, or 'skip')"

**User responds**:
```
Spring is here! We're excited to share this week's top recommendations.
Don't miss our exclusive Songkran festival guide!
```

**Output**:
```
✅ Custom content added (bilingual)
```

---

## Step 3: Subject Line Generation

**Claude analyzes content**:
```typescript
// Content themes detected:
// - Food (article #5)
// - Visa (article #8)
// - Songkran/Events (article #12, event #18)
// - Digital nomad community (event #15)

// Generate subject line options
```

**Claude presents options**:
```
📧 Suggested Subject Lines:

1. "Chiang Mai Food Guide & Songkran 2026 | מדריך אוכל צ'אנג מאי וסונגקראן 2026"
   (Focus: Food + Songkran event)

2. "This Week: Visa Updates, Vegan Food & Events | השבוע: עדכוני ויזה, אוכל ואירועים"
   (Focus: Weekly roundup)

3. "Spring in Thailand: Your Complete Guide | אביב בתאילנד: המדריך המלא שלכם"
   (Focus: Seasonal theme)

Which subject line? (1-3, or type your own)
```

**User responds**: "1"

**Output**:
```
✅ Subject line selected:
   EN: "Chiang Mai Food Guide & Songkran 2026"
   HE: "מדריך אוכל צ'אנג מאי וסונגקראן 2026"
```

---

## Step 4: HTML Preview

**Claude generates preview**:
```typescript
const preview = await trpc.newsletter.previewNewsletter.query({
  articleIds: [5, 8, 12],
  eventIds: [15, 18],
  customContent: "Spring is here!...",
  customContentHe: "האביב הגיע!...",
});

// Save to temp file
const previewPath = `/tmp/newsletter-preview-${Date.now()}.html`;
fs.writeFileSync(previewPath, preview.html);
```

**Output**:
```
📄 Newsletter Preview Generated

Preview saved to: /tmp/newsletter-preview-1738051200000.html
Opening in browser...

✓ Preview opened in default browser
```

**Claude shows preview summary**:
```
Newsletter Contents:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Custom Announcement (Hebrew/English)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📰 Articles (3):
   1. Best Vegan Restaurants in Chiang Mai
   2. Thailand Visa Update 2026
   3. Songkran Festival 2026 Guide ⭐

📅 Events (2):
   1. Digital Nomad Meetup (Feb 15) - Free
   2. VIP Songkran Pool Party (Apr 13) - ₪299 ⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Preview looks good?
1. Yes, proceed to send
2. No, modify content
3. Save and exit
```

**User responds**: "1"

---

## Step 5: Test Send (Optional)

**Claude asks**: "Send test email first? (Recommended) Enter test email address, or 'skip':"

**User responds**: "myemail@example.com"

**Claude sends test**:
```typescript
await sendEmail({
  to: "myemail@example.com",
  subject: "[TEST] Chiang Mai Food Guide & Songkran 2026 | מדריך אוכל...",
  html: preview.html,
});
```

**Output**:
```
📧 Test email sent to: myemail@example.com

✓ Email sent successfully

Please check your inbox and verify:
- [ ] Subject line displays correctly
- [ ] Hebrew text flows right-to-left (RTL)
- [ ] English text flows left-to-right (LTR)
- [ ] Premium badges appear correctly
- [ ] All links work
- [ ] Images load (if any)
- [ ] Unsubscribe link works

Ready to send to all subscribers? (yes/no)
```

**User responds**: "yes"

---

## Step 6: Mass Send

**Claude confirms details**:
```
📬 Newsletter Send Confirmation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject (EN): Chiang Mai Food Guide & Songkran 2026
Subject (HE): מדריך אוכל צ'אנג מאי וסונגקראן 2026

Content:
- 3 articles (2 free, 1 premium)
- 2 events (1 free, 1 premium)
- Custom bilingual announcement

Recipients: 1,247 active subscribers
Tier: All (free + premium)
Estimated send time: ~25 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Send to tier: [all / free / premium]
```

**User responds**: "all"

**Claude executes send**:
```typescript
const result = await trpc.newsletter.sendNewsletter.mutate({
  subject: "Chiang Mai Food Guide & Songkran 2026",
  subjectHe: "מדריך אוכל צ'אנג מאי וסונגקראן 2026",
  articleIds: [5, 8, 12],
  eventIds: [15, 18],
  customContent: "Spring is here!...",
  customContentHe: "האביב הגיע!...",
  tier: "all",
});
```

**Output (real-time)**:
```
📤 Sending newsletter to 1,247 subscribers...

Batch 1/25 sent (50/1,247) ████░░░░░░░░░░░░░░░░  4%
Batch 2/25 sent (100/1,247) ████████░░░░░░░░░░░░  8%
Batch 3/25 sent (150/1,247) ████████████░░░░░░░░ 12%
...
Batch 24/25 sent (1,200/1,247) ████████████████████ 96%
Batch 25/25 sent (1,247/1,247) ████████████████████ 100%

✅ Newsletter sent successfully!
```

**Final summary**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Newsletter Send Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Sent: 1,200 emails
✗ Failed: 47 emails
📊 Success rate: 96.2%

Send duration: 26 minutes
Average: ~46 emails/minute

Failed emails have been logged for retry.
Check admin dashboard for detailed delivery status.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Newsletter sent at: 2026-01-28 10:26:18 (GMT+7)
Database updated: lastEmailSent for all recipients
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Post-Send Actions

**Claude suggests**:
```
Newsletter sent! Next steps:

1. Monitor email delivery:
   - Check Resend dashboard for bounces
   - Watch for spam complaints
   - Track open rates (if enabled)

2. Update subscribers:
   - lastEmailSent field updated automatically
   - Failed emails logged for manual review

3. Review analytics (24 hours):
   - Open rate (typical: 20-30%)
   - Click rate (typical: 3-5%)
   - Unsubscribe rate (should be < 2%)

4. Plan next newsletter:
   - Weekly cadence: Send next Thursday/Friday
   - Content ideas: Prepare 3-4 articles in advance
   - Event updates: Check upcoming events calendar

Need help with any follow-up tasks?
```

---

## Complete Workflow Summary

**Total time**: ~35 minutes
- Content selection: 5 min
- Subject line: 2 min
- Preview review: 3 min
- Test send: 5 min
- Mass send: 26 min

**User interactions**: 8 prompts
- Article selection
- Event selection
- Custom content (Hebrew)
- Custom content (English)
- Subject line choice
- Preview confirmation
- Test email address
- Send confirmation

**System operations**: 6 API calls
- article.list query
- event.list query
- newsletter.previewNewsletter query
- Test email send
- newsletter.sendNewsletter mutation
- Database updates (automatic)

---

## Variations

### Variation 1: No Custom Content

Skip custom content prompts by saying "skip" or "none":
```
Claude: "Any custom content to add? (Hebrew)"
User: "skip"
Claude: "Any custom content to add? (English)"
User: "skip"
```

### Variation 2: Premium-Only Newsletter

When asked for tier:
```
Claude: "Send to tier: [all / free / premium]"
User: "premium"
```

Result: Only 234 premium subscribers receive newsletter

### Variation 3: Skip Test Send

When asked for test email:
```
Claude: "Enter test email address, or 'skip':"
User: "skip"
```

Proceed directly to mass send

### Variation 4: Custom Subject Line

When shown subject line options:
```
Claude: "Which subject line? (1-3, or type your own)"
User: "Thailand Newsletter - January 28 | ניוזלטר תאילנד - 28 בינואר"
```

Use custom subject instead of generated options

---

## Troubleshooting Examples

### Problem: Missing Hebrew Content

```
⚠️ Warning: Article #12 is missing Hebrew excerpt (excerptHe)
The newsletter will show only the English version for this article.

Options:
1. Continue anyway
2. Remove article #12 from newsletter
3. Edit article to add Hebrew content first

Your choice?
```

### Problem: No Active Subscribers

```
❌ Error: No active subscribers found for tier 'premium'

Current subscriber count:
- Total active: 1,247
- Free tier: 1,013 (81%)
- Premium tier: 0 (0%)

Suggestions:
- Send to tier 'all' instead
- Check if premium subscriptions are properly synced
- Wait for first premium subscriber to sign up
```

### Problem: Email Service Failure

```
❌ Error: Resend API failure - rate limit exceeded

Your account has reached the hourly send limit.
Newsletter has been saved as a draft.

Options:
1. Retry in 1 hour (recommended)
2. Upgrade Resend plan for higher limits
3. Contact support

Draft saved to: drafts/newsletter-2026-01-28.json
```

---

This example demonstrates the complete newsletter workflow from start to finish with realistic interactions, validations, and error handling.
