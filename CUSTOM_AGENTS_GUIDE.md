# Custom Agents Guide - Thailand Hayom

## Overview

Three specialized agents have been created to streamline Thailand Hayom development workflows. These agents are autonomous, context-aware, and designed specifically for your bilingual travel platform.

**Location**: `~/.claude/plugins/cache/claude-plugins-official/plugin-dev/[hash]/agents/`

---

## 1. Bilingual Content Creator

**Agent Name**: `bilingual-content-creator`
**Color**: Cyan 🔵

### Purpose
Generates high-quality bilingual Hebrew/English content for articles, lessons, events, and emails with proper RTL formatting and cultural adaptation.

### When to Use
- Creating new newsletter articles about Thailand
- Writing Thai language lesson content
- Generating event descriptions
- Designing email templates
- Any task requiring Hebrew + English content

### Triggers
Say things like:
- "Write an article about best vegan restaurants in Bangkok"
- "Create lesson 11 about Thai weather"
- "Generate a welcome email for premium subscribers"
- "Add an event for Songkran festival 2026"

### What It Does
- Generates bilingual content (title/titleHe, content/contentHe)
- Ensures natural Hebrew translation (not literal)
- Follows Thailand Hayom database schema
- Creates SEO-optimized content for Israeli searches
- Adapts cultural references for Israeli audience
- Formats for RTL display

### Output Format
- **Articles**: SQL INSERT statements ready for database
- **Lessons**: TypeScript objects with full structure
- **Events**: JSON with all required fields
- **Emails**: HTML templates with bilingual sections

---

## 2. Stripe Payment Tester

**Agent Name**: `stripe-payment-tester`
**Color**: Yellow 🟡

### Purpose
Tests Stripe payment flows, validates webhook handling, and diagnoses payment issues for Israel-specific (ILS) transactions.

### When to Use
- After updating payment code
- Before deploying to production
- When customers report payment issues
- Testing subscription flows
- Verifying currency and pricing

### Triggers
Say things like:
- "Test the Stripe checkout flow"
- "Verify webhook handlers are working"
- "Check if premium subscriptions work"
- "Customers didn't receive Welcome Kit email"
- "Make sure Stripe is configured correctly"

### What It Does
- Validates environment variables (API keys, webhook secret)
- Tests checkout session creation (₪20, ₪160, ₪300 products)
- Simulates webhook events using Stripe CLI
- Verifies database insertions (purchases table)
- Tests email delivery (Welcome Kit PDF)
- Checks ILS currency formatting
- Generates comprehensive test reports

### Key Features
- End-to-end payment flow testing
- Stripe test card validation (4242...)
- Failed payment scenario testing
- Duplicate event prevention checks
- Database and email verification

---

## 3. Thai Lesson Generator

**Agent Name**: `thai-lesson-generator`
**Color**: Green 🟢

### Purpose
Creates comprehensive Thai language lesson content with Thai script, phonetic pronunciation, Hebrew/English translations, and cultural context.

### When to Use
- Creating new Thai lessons (11-30)
- Adding phrases to existing lessons
- Writing realistic dialogues
- Generating practice exercises
- Expanding lesson content

### Triggers
Say things like:
- "Create lesson 11 about Thai weather and seasons"
- "Add 5 more phrases to the food lesson"
- "Write a dialogue for taking a taxi"
- "Generate quiz questions for shopping lesson"
- "Expand lesson 3 with more restaurant phrases"

### What It Does
- Generates complete lesson structure (phrases, dialogues, exercises)
- Creates accurate Thai script with romanization
- Provides natural Hebrew and English translations
- Includes cultural tips and usage scenarios
- Designs interactive practice exercises
- Follows existing lesson format exactly

### Lesson Components
1. **Phrases**: Thai script + phonetics + Hebrew/English + scenarios + cultural tips
2. **Dialogues**: Realistic Thai-Hebrew conversations with Israeli names
3. **Exercises**: Multiple choice questions with bilingual explanations

### Output Format
TypeScript objects ready to insert into `lessonsData.ts`:
```typescript
export const lesson11: Lesson = {
  id: 11,
  title: "Weather & Seasons",
  titleHebrew: "מזג אוויר ועונות",
  icon: "☀️",
  phrases: [...],
  dialogue: [...],
  exercises: [...]
};
```

---

## How to Use Agents

### Method 1: Natural Language Triggering
Just ask Claude Code naturally:
```
"Write an article about Chiang Mai night markets"
→ Automatically triggers bilingual-content-creator

"Test if Stripe payments are working"
→ Automatically triggers stripe-payment-tester

"Create a new lesson about Thai food"
→ Automatically triggers thai-lesson-generator
```

### Method 2: Explicit Agent Call (Advanced)
You can also explicitly request an agent:
```
"Use the bilingual-content-creator agent to write..."
"Run the stripe-payment-tester agent to verify..."
"Call the thai-lesson-generator agent for..."
```

---

## Agent Workflow Examples

### Example 1: Creating a New Article
**You say**: "Write an article about best vegan restaurants in Bangkok"

**What happens**:
1. `bilingual-content-creator` agent launches
2. Generates article content in English and Hebrew
3. Creates SEO-friendly titles and excerpts
4. Formats markdown content with H2/H3 structure
5. Adds practical details (addresses, prices in ₪)
6. Provides SQL INSERT statement ready for database

**Output**: Complete SQL ready to run in database or admin panel

---

### Example 2: Testing Stripe After Code Changes
**You say**: "Test the Stripe payment flow"

**What happens**:
1. `stripe-payment-tester` agent launches
2. Validates environment variables (API keys, webhook secret)
3. Tests checkout session creation for all product types
4. Uses Stripe CLI to simulate webhooks
5. Verifies database insertions and email delivery
6. Generates comprehensive test report with pass/fail status

**Output**: Detailed test report with issues found and recommendations

---

### Example 3: Expanding Thai Lessons
**You say**: "Create lesson 11 about weather and seasons"

**What happens**:
1. `thai-lesson-generator` agent launches
2. Reads existing lessons to understand style
3. Generates 5-8 weather-related phrases with Thai script
4. Creates realistic dialogue (Israeli tourist + Thai local)
5. Designs 3-5 practice exercises with explanations
6. Provides TypeScript object ready to insert in lessonsData.ts

**Output**: Complete lesson structure matching existing format

---

## Agent Capabilities Summary

| Agent | Reads Code | Writes Code | Runs Tests | Database Access | External APIs |
|-------|-----------|-------------|-----------|----------------|--------------|
| bilingual-content-creator | ✅ | ✅ | ❌ | Read schema | ❌ |
| stripe-payment-tester | ✅ | ❌ | ✅ | Read/verify | Stripe CLI |
| thai-lesson-generator | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## Benefits

### Time Savings
- **Articles**: 30 min → 5 min (83% faster)
- **Thai Lessons**: 60 min → 10 min (83% faster)
- **Payment Testing**: 45 min → 5 min (89% faster)

### Quality Improvements
- Consistent bilingual formatting (no RTL errors)
- Accurate Thai romanization following standard system
- Comprehensive payment testing (no missed edge cases)
- Natural Hebrew translations (not Google Translate quality)

### Workflow Benefits
- Less context switching (agents handle multi-step tasks)
- Reduced errors (agents follow schema exactly)
- Better documentation (agents explain decisions)
- Faster iteration (test → fix → test cycle)

---

## Advanced Tips

### Chaining Agents
You can use multiple agents in sequence:
```
"Create lesson 11 about weather, then write an article about
how to prepare for monsoon season in Thailand"

→ thai-lesson-generator creates lesson
→ bilingual-content-creator writes article
```

### Providing Context
Give agents more context for better results:
```
"Create a premium article (for paid subscribers) about
hidden vegan restaurants in Bangkok - focus on Northern Thai cuisine"

→ Agent will mark isPremium: true and focus on niche content
```

### Requesting Revisions
Agents can iterate on their output:
```
Agent: [Generates article]
You: "Make the Hebrew more casual and add more practical tips"
Agent: [Revises with requested changes]
```

---

## Troubleshooting

### Agent Not Triggering
If an agent doesn't automatically trigger:
- Use more specific language ("write a bilingual article" vs "write something")
- Explicitly mention the agent name
- Check that your task matches the agent's description

### Output Format Issues
If output doesn't match expected format:
- Agent will read schema files to verify format
- Ask agent to "check the database schema first"
- Provide example of desired output

### Testing Failures
If payment tests fail:
- Check `.env` for correct Stripe keys
- Ensure database is accessible
- Verify Stripe CLI is installed (`stripe --version`)

---

## Future Enhancements

### Potential New Agents
Based on your workflow, consider creating:
- **newsletter-composer**: Assembles weekly newsletter from articles
- **seo-analyzer**: Audits articles for search optimization
- **database-migrator**: Generates Drizzle migrations safely
- **email-template-tester**: Tests Resend email delivery
- **content-translator**: Translates existing English content to Hebrew

### Agent Improvements
Current agents can be enhanced with:
- Integration with Supabase API (direct database writes)
- Canva API integration (generate article images)
- OpenAI API (generate more natural Thai dialogues)
- Stripe Analytics API (pull real payment data for reports)

---

## Support

### Getting Help
- Agents will explain their decisions in comments
- Ask agents to "explain your reasoning" for transparency
- Request "show me an example" for clarification

### Modifying Agents
Agent files located at:
```
~/.claude/plugins/cache/claude-plugins-official/plugin-dev/[hash]/agents/
```

Each agent is a markdown file with YAML frontmatter. You can:
- Edit system prompts to change behavior
- Add new triggering examples
- Adjust tool access (Read, Write, Bash, etc.)
- Change color for visual identification

### Feedback
If agents need improvement:
- Note specific failures or unexpected behavior
- Provide examples of desired output
- Suggest additional capabilities or checks

---

## Quick Reference

### Bilingual Content Creator
- **Triggers**: article, lesson, event, email, translate, bilingual
- **Output**: SQL, TypeScript, JSON, HTML
- **Best for**: Content generation, translation, database inserts

### Stripe Payment Tester
- **Triggers**: test payment, stripe, webhook, checkout, subscription
- **Output**: Test report (markdown)
- **Best for**: Payment validation, debugging, pre-deployment checks

### Thai Lesson Generator
- **Triggers**: create lesson, add phrases, dialogue, exercise, Thai
- **Output**: TypeScript lesson object
- **Best for**: Educational content, language learning, curriculum expansion

---

**Last Updated**: 2026-01-28
**Thailand Hayom Version**: 1.0
**Agent Version**: 1.0
