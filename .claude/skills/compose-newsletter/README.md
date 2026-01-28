# Compose Newsletter Skill

A comprehensive skill for composing and sending bilingual (Hebrew/English) newsletters to Thailand Hayom subscribers.

## Quick Start

Trigger this skill by saying:
- "Send newsletter"
- "Compose newsletter"
- "Create newsletter"
- "Send email to subscribers"
- "Draft newsletter"

## What This Skill Does

This skill guides you through a 6-step workflow:

1. **Fetch Content** - Lists available published articles and upcoming events
2. **Select Content** - Helps you choose articles/events to include
3. **Generate Subject** - Creates bilingual subject lines
4. **Preview HTML** - Shows newsletter HTML in browser
5. **Test Send** - Optional test email before mass send
6. **Mass Send** - Sends to all active subscribers with progress tracking

## Files Structure

```
compose-newsletter/
├── SKILL.md                          # Main skill instructions
├── README.md                         # This file
├── scripts/
│   ├── validate-bilingual.ts         # Validates Hebrew/English content
│   └── preview-newsletter.sh         # Opens preview in browser
├── references/
│   ├── email-templates.md            # HTML template documentation
│   └── subscriber-tiers.md           # Tier system explanation
└── examples/
    ├── sample-newsletter.json        # Complete newsletter example
    └── send-workflow.md              # End-to-end workflow walkthrough
```

## Usage Example

```
User: "I want to send a newsletter"

Claude: [Lists 12 published articles and 5 upcoming events]
Claude: "Which articles would you like to include?"

User: "5, 8, 12"

Claude: [Validates content, generates subject lines]
Claude: "Preview looks good?"

User: "yes"

Claude: [Sends to 1,247 subscribers with progress bar]
Claude: "✅ Newsletter sent! 1,200 sent, 47 failed"
```

## Features

### Bilingual Validation
- Checks that articles have both `title` and `titleHe`
- Warns if excerpts are missing
- Validates events have complete Hebrew/English fields

### Smart Subject Lines
- Analyzes content themes (food, visa, events, etc.)
- Generates contextually relevant subjects
- Provides 2-3 options or allows custom input

### Progressive Preview
- Generates HTML using existing newsletter template
- Opens in browser for visual review
- Allows modifications before sending

### Safe Sending
- Optional test send before mass delivery
- Batch sending (50 emails/batch with 1s delay)
- Progress tracking during send
- Error logging for failed sends

## Scripts

### validate-bilingual.ts

Validates content has complete bilingual fields:

```bash
# Validate articles
tsx .claude/skills/compose-newsletter/scripts/validate-bilingual.ts articles 5,8,12

# Validate events
tsx .claude/skills/compose-newsletter/scripts/validate-bilingual.ts events 15,18
```

Output:
```
✅ article #5: Best Vegan Restaurants
⚠️  article #12: Songkran Festival Guide
   - Missing Hebrew excerpt (excerptHe)
```

### preview-newsletter.sh

Opens HTML preview in browser:

```bash
.claude/skills/compose-newsletter/scripts/preview-newsletter.sh /tmp/newsletter.html
```

## References

### email-templates.md

Comprehensive documentation of newsletter HTML template:
- Layout structure
- Color scheme
- Typography
- RTL support
- Responsive design
- Email client compatibility
- Customization guidelines

### subscriber-tiers.md

Explains the tier system:
- Free vs Premium tiers
- Database schema
- Tier filtering (all/free/premium)
- Content access by tier
- Migration between tiers
- Best practices

## Examples

### sample-newsletter.json

Complete newsletter example with:
- 3 articles (2 free, 1 premium)
- 2 events (1 free, 1 premium)
- Bilingual custom content
- Metadata and notes

### send-workflow.md

Detailed end-to-end walkthrough showing:
- Complete 6-step workflow
- Real user interactions
- System outputs
- Error handling examples
- Workflow variations
- Troubleshooting scenarios

## Integration Points

This skill integrates with:
- **tRPC Routers**: `article.list`, `event.list`, `newsletter.previewNewsletter`, `newsletter.sendNewsletter`
- **Database Tables**: `articles`, `events`, `newsletterSubscribers`
- **Email Service**: Resend API via `server/emailService.ts`
- **Template Generator**: `server/newsletterRouter.ts` → `generateNewsletterHTML()`

## Requirements

### Environment Variables
```bash
RESEND_API_KEY=re_...           # For sending emails
DATABASE_URL=postgresql://...   # Supabase connection
```

### Database Tables
- `articles` - Published articles with bilingual content
- `events` - Upcoming events with bilingual content
- `newsletterSubscribers` - Active subscribers with tier info

### API Endpoints
- `trpc.article.list` - Fetch published articles
- `trpc.event.list` - Fetch upcoming events
- `trpc.newsletter.previewNewsletter` - Generate HTML preview
- `trpc.newsletter.sendNewsletter` - Send to subscribers

## Best Practices

### Content Selection
- Mix 2-4 articles maximum (avoid overwhelming)
- Include both free and premium content for variety
- Feature time-sensitive events prominently
- Add custom content for personal announcements

### Subject Lines
- Be specific and descriptive
- Include month/date context
- Keep Hebrew and English meanings parallel
- Avoid ALL CAPS or excessive punctuation

### Sending Strategy
- Send during Thai business hours (GMT+7)
- Avoid weekends unless event-driven
- Always send test email first
- Monitor delivery rates and adjust

### Frequency Guidelines
- Weekly newsletter: Thursday or Friday
- Monthly digest: First week of month
- Event alerts: As needed (max 1/week)
- Upgrade offers to free tier: Max 1/month

## Troubleshooting

### Missing Bilingual Content
```
⚠️ Warning: Article #12 missing Hebrew excerpt
Continue anyway? (yes/no)
```

**Solution**: Either add Hebrew content or proceed without it

### No Active Subscribers
```
❌ Error: No active subscribers found for tier 'premium'
```

**Solution**: Change to tier 'all' or wait for premium signups

### Email Service Failure
```
❌ Error: Resend API rate limit exceeded
Newsletter saved as draft
```

**Solution**: Wait 1 hour and retry, or upgrade Resend plan

### Database Connection Error
```
❌ Error: Cannot connect to database
```

**Solution**: Check DATABASE_URL in .env file

## Testing

Before using in production:

1. **Validate environment**:
   ```bash
   # Check DATABASE_URL
   echo $DATABASE_URL

   # Check RESEND_API_KEY
   echo $RESEND_API_KEY
   ```

2. **Test content fetching**:
   - Ensure articles and events exist in database
   - Verify bilingual fields are populated

3. **Test preview generation**:
   - Send test newsletter to yourself
   - Check in multiple email clients (Gmail, Apple Mail, Outlook)
   - Verify RTL Hebrew displays correctly

4. **Test batch sending**:
   - Start with small subscriber list
   - Monitor for bounces and failures
   - Verify lastEmailSent updates in database

## Version History

- **v0.1.0** (2026-01-28)
  - Initial skill creation
  - 6-step workflow implementation
  - Bilingual validation
  - Batch sending with progress tracking
  - Complete documentation and examples

## Support

For issues or questions:
- Check `examples/send-workflow.md` for detailed walkthrough
- Review `references/` for template and tier documentation
- Run validation scripts to catch errors early
- Monitor Resend dashboard for delivery issues

---

**Created for**: Thailand Hayom (תאילנד היום)
**Platform**: Claude Code
**Language**: Bilingual (Hebrew/English)
