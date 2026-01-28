---
name: Compose Newsletter
description: This skill should be used when the user asks to "send newsletter", "compose newsletter", "create newsletter", "send email to subscribers", "draft newsletter", or wants to send content to newsletter subscribers. Guides through selecting bilingual content, generating subjects, previewing HTML, and sending to subscribers.
version: 0.1.0
---

# Compose Newsletter Skill

This skill provides step-by-step guidance for composing and sending bilingual (Hebrew/English) newsletters to Thailand Hayom subscribers.

## Purpose

The compose-newsletter skill streamlines the newsletter creation workflow by:
- Querying published articles and upcoming events from the database
- Validating bilingual content exists (Hebrew and English)
- Generating appropriate subject lines in both languages
- Previewing newsletter HTML before sending
- Supporting test sends to verify formatting
- Batch sending to all active subscribers with proper rate limiting

## When to Use

Use this skill when the user wants to:
- Send a newsletter to subscribers
- Draft newsletter content with articles and events
- Preview newsletter formatting
- Test newsletter delivery before mass send
- Schedule or compose regular updates

## Workflow Overview

The skill follows a six-step process:

1. **Fetch Available Content** - List published articles and upcoming events
2. **Content Selection** - Help user choose articles/events to include
3. **Subject Line Generation** - Create bilingual subject lines
4. **HTML Preview** - Show newsletter HTML for review
5. **Test Send** (Optional) - Send to test email for validation
6. **Mass Send** - Send to all active subscribers

## Step-by-Step Implementation

### Step 1: Fetch Available Content

Query the database for newsletter-worthy content:

```typescript
// List published articles
const articles = await trpc.article.list.query({
  page: 1,
  limit: 20,
  isPublished: true,
});

// List upcoming events (next 60 days)
const events = await trpc.event.list.query({
  page: 1,
  limit: 10,
  upcoming: true, // Events with eventDate >= today
});
```

**Validation checks:**
- Verify articles have both `title` and `titleHe` fields
- Verify events have both `title` and `titleHe` fields
- Check that content has bilingual excerpts/descriptions
- Warn if content is missing bilingual fields

**Present to user:**
Display content in a clear format:
```
Available Articles (10):
1. [ID: 5] Best Vegan Restaurants | מסעדות טבעוניות טובות
2. [ID: 8] Visa Update 2026 | עדכון ויזה 2026
...

Upcoming Events (3):
1. [ID: 12] Songkran Festival | פסטיבל סונגקראן (2026-04-13)
2. [ID: 15] Digital Nomad Meetup | מפגש נוודים (2026-02-15)
...
```

### Step 2: Content Selection

Guide user through content selection:

**Ask the user:**
- "Which articles would you like to include? (Enter IDs separated by commas, or 'all')"
- "Which events would you like to include? (Enter IDs separated by commas, 'all', or 'none')"
- "Any custom content to add? (Hebrew text, optional)"
- "Any custom content to add? (English text, optional)"

**Validation:**
- Verify selected IDs exist in the fetched content
- Warn if no articles selected (newsletters should have content)
- Confirm if both custom content fields are empty
- Check that selected content has complete bilingual fields

**Parse user input:**
```typescript
// Example: "5,8,12" → [5, 8, 12]
// Example: "all" → all article IDs
const articleIds = parseSelection(userInput, availableArticles);
const eventIds = parseSelection(userInput, availableEvents);
```

### Step 3: Subject Line Generation

Generate contextually relevant bilingual subject lines:

**Analysis:**
- Examine selected articles for common themes (food, visa, attractions, events, lifestyle, safety)
- Check event dates and types
- Consider current date and seasonal relevance

**Subject line formula:**
```
Pattern: [Theme] | [Date Context] - Thailand Hayom
Hebrew: [תאילנד היום - [הקשר תאריכים] | [נושא
```

**Examples:**
```
"Chiang Mai Food Guide & Songkran 2026 | מדריך אוכל צ'אנג מאי וסונגקראן"
"February Newsletter: Visa Updates | ניוזלטר פברואר: עדכוני ויזה"
"Week of Jan 28: Events & Safety Tips | שבוע 28 בינואר: אירועים וטיפי בטיחות"
```

**Present to user:**
Show 2-3 generated options and ask for preference or custom input:
```
Suggested Subject Lines:

1. "Thailand Travel Updates - January 2026 | עדכוני תאילנד - ינואר 2026"
2. "New Articles: Food & Visa Guide | מאמרים חדשים: מדריך אוכל וויזה"
3. Custom: [Let me write my own]

Which subject line? (1-3 or write your own)
```

### Step 4: HTML Preview

Generate newsletter HTML using the existing `newsletterRouter.previewNewsletter` endpoint:

```typescript
const preview = await trpc.newsletter.previewNewsletter.query({
  articleIds: selectedArticleIds,
  eventIds: selectedEventIds,
  customContent: customContentEn,
  customContentHe: customContentHe,
});
```

**Display preview:**
Save HTML to temporary file and show path:
```
Newsletter preview saved to: /tmp/newsletter-preview-[timestamp].html

Opening in browser...
```

Use `open` command (macOS) or equivalent to display in browser:
```bash
open /tmp/newsletter-preview-[timestamp].html
```

**Ask for confirmation:**
```
Preview looks good?
1. Yes, proceed to send
2. No, modify content
3. Save and exit
```

### Step 5: Test Send (Optional)

Offer test send before mass delivery:

**Ask:**
```
Send test email first? (Recommended)
Enter test email address, or 'skip' to send to all subscribers:
```

**If test email provided:**
Use a custom test send function (create if needed):
```typescript
// Send single test email
await sendEmail({
  to: testEmail,
  subject: `[TEST] ${subjectHe} | ${subjectEn}`,
  html: previewHtml,
});
```

**Confirm receipt:**
```
Test email sent to: user@example.com

Check your inbox and verify formatting.
Ready to send to all subscribers? (yes/no)
```

### Step 6: Mass Send

Send newsletter to all active subscribers:

**Confirm details:**
Display summary before sending:
```
Newsletter Summary:
- Articles: 3 selected
- Events: 1 selected
- Subject: "Thailand Updates | עדכוני תאילנד"
- Recipients: ~1,247 active subscribers (based on tier: all/free/premium)

Send to: [all / free / premium] subscribers?
```

**Execute send:**
```typescript
const result = await trpc.newsletter.sendNewsletter.mutate({
  subject: subjectEn,
  subjectHe: subjectHe,
  articleIds: selectedArticleIds,
  eventIds: selectedEventIds,
  customContent: customContentEn,
  customContentHe: customContentHe,
  tier: selectedTier, // 'all', 'free', or 'premium'
});
```

**Monitor progress:**
The `sendNewsletter` endpoint sends in batches of 50 with 1-second delays between batches. Show progress:
```
Sending newsletter...
Batch 1/25 sent (50/1,247 subscribers)
Batch 2/25 sent (100/1,247 subscribers)
...
Complete: 1,200 sent, 47 failed
```

**Display results:**
```
Newsletter sent successfully!

Results:
✓ Sent: 1,200 emails
✗ Failed: 47 emails
📊 Success rate: 96.2%

Failed emails logged to database for retry.
```

## Validation Rules

### Bilingual Content Validation

Before allowing content selection:
- **Articles**: Must have `title` AND `titleHe`
- **Articles**: Should have `excerpt` OR `excerptHe` (warn if missing)
- **Events**: Must have `title` AND `titleHe`
- **Events**: Should have `description` OR `descriptionHe` (warn if missing)

**Warning message:**
```
⚠️ Warning: Article #5 is missing Hebrew excerpt (excerptHe)
The newsletter will show only the English version for this article.
Continue anyway? (yes/no)
```

### Subject Line Validation

- Both `subject` (English) and `subjectHe` (Hebrew) must be provided
- Length limits: 40-120 characters each
- Should not include emoji (unless explicitly requested)
- Must not be empty or whitespace-only

### Recipient Tier Validation

When selecting tier:
- **all**: Sends to all active subscribers (free + premium)
- **free**: Sends only to free tier subscribers
- **premium**: Sends only to premium tier subscribers

Confirm subscriber count before sending:
```
Selected tier: premium
Active premium subscribers: 234

This will send to 234 recipients. Confirm? (yes/no)
```

## Error Handling

### Common Errors

**Database unavailable:**
```
Error: Cannot connect to database.
Check DATABASE_URL environment variable and Supabase connection.
```

**No active subscribers:**
```
Error: No active subscribers found for tier 'free'.
Check newsletter_subscribers table or try tier 'all'.
```

**Email service failure:**
```
Error: Resend API failure - rate limit exceeded.
Newsletter saved as draft. Retry in 1 hour.
```

**Missing environment variables:**
```
Error: RESEND_API_KEY not configured.
Set RESEND_API_KEY in .env file to send emails.
```

### Graceful Degradation

- If preview generation fails, show raw HTML in terminal
- If test send fails, offer to continue with mass send
- If mass send partially fails, log failures and continue
- Save newsletter draft if any critical error occurs

## Additional Resources

### Scripts

- **`scripts/validate-bilingual.ts`** - Validates content has both Hebrew and English fields
- **`scripts/preview-newsletter.sh`** - Opens newsletter preview in browser

### References

- **`references/email-templates.md`** - Newsletter HTML template structure and customization
- **`references/subscriber-tiers.md`** - Explanation of free vs premium tiers and filtering

### Examples

- **`examples/sample-newsletter.json`** - Example newsletter composition with all fields
- **`examples/send-workflow.md`** - Complete end-to-end workflow example

## Tips for Effective Newsletters

**Content selection:**
- Mix content types (articles + events) for variety
- Include 2-4 articles maximum to avoid overwhelming subscribers
- Feature time-sensitive events prominently
- Add custom content for personal touch or announcements

**Subject lines:**
- Be specific and descriptive ("Visa Updates & Songkran Guide" not "Newsletter #12")
- Include month or date context for timeliness
- Keep Hebrew and English subjects parallel in meaning
- Test subject lines for spam triggers (avoid ALL CAPS, excessive punctuation)

**Sending strategy:**
- Send during business hours in Thailand timezone (GMT+7)
- Avoid weekends unless event-driven
- Test send to multiple email clients (Gmail, Outlook, Apple Mail)
- Monitor open rates and adjust send times accordingly

**Follow-up:**
After sending, check:
- Email delivery logs in Resend dashboard
- Bounce rate and unsubscribe rate
- Open rate (if tracking enabled)
- Database updates to `lastEmailSent` field

## Integration Points

This skill integrates with:
- **tRPC routers**: `newsletter.previewNewsletter`, `newsletter.sendNewsletter`
- **Database tables**: `articles`, `events`, `newsletterSubscribers`
- **Email service**: Resend API via `emailService.ts`
- **PDF generation**: `pdfGenerator.ts` (for attachments if needed)

Ensure these dependencies are properly configured before using this skill.
