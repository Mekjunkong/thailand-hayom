# 🚀 Quick Start: Using Your Agents

## Try These Prompts Right Now!

### 📝 Content Creation

```
Create a bilingual article about "Best Coffee Shops in Chiang Mai for Digital Nomads"
```

```
Generate an article about "Thailand Travel Insurance: Complete Guide for Israelis"
```

```
Write content for the Events page introduction (Hebrew + English)
```

### 🗣️ Thai Lessons

```
Build Lesson 12: Health & Pharmacy
```

```
Expand Lesson 3 (Ordering Food) with 5 more phrases about Thai desserts
```

```
Create a dialogue for Lesson 5 about taking a taxi to the airport
```

### 📧 Email Newsletters

```
Create a weekly newsletter for December 20, 2025 featuring the visa article and upcoming Songkran festival
```

```
Design a "payment confirmation" email template for Welcome Kit purchases
```

```
Create a monthly recap email highlighting top 3 articles from the month
```

### 💳 Stripe Debugging

```
Test my Stripe webhook locally and verify it's working
```

```
Check if my payment flow correctly handles ILS currency
```

```
Debug why emails aren't being sent after successful payments
```

### 🗄️ Database Work

```
Create a table for storing article comments with user_id, article_id, and content
```

```
Add a "favorites" table so users can bookmark articles
```

```
Help me add a "views" counter system to track article popularity
```

---

## 🎯 Real Workflow Examples

### Workflow 1: Launch Newsletter Feature (30 min)

**Step 1**: Create email template
```
Use newsletter-composer to create a weekly newsletter template
```

**Step 2**: Generate sample articles (use bilingual-content-generator)
```
Create 3 articles:
1. Top 5 temples in Chiang Mai
2. Thai street food safety guide
3. Visa extension walkthrough 2026
```

**Step 3**: Set up database
```
Add a table for tracking newsletter sends with sent_at, recipient_count, open_rate
```

**Step 4**: Test email delivery
```
Test sending the newsletter to my email address
```

---

### Workflow 2: Complete Thai Course (2-3 hours)

**Step 1**: Build remaining lessons (currently have 10, need 20 more)
```
Build lesson 11: Weather & Seasons [DONE ✅]
Build lesson 12: Health & Pharmacy
Build lesson 13: Money & Banking
Build lesson 14: Technology & Internet
Build lesson 15: Making Friends
```

**Step 2**: Add exercises to existing lessons
```
Add 3 more exercises to Lesson 1 (Greetings)
Create a dialogue for Lesson 4 (Shopping & Bargaining)
```

**Step 3**: Generate phrase cards PDF
```
Create downloadable flashcards for all 30 lessons
```

---

### Workflow 3: Fix Payment Issues (15 min)

**Step 1**: Audit current setup
```
Run a complete Stripe audit and show me any issues [DONE ✅]
```

**Step 2**: Apply fixes
```
Fix the PostgreSQL insert bug in webhookHandler.ts
```

**Step 3**: Test end-to-end
```
Walk me through testing the complete payment flow from checkout to email
```

---

### Workflow 4: Build Events Feature (1 hour)

**Step 1**: Database setup
```
Create event registrations table [DONE ✅]
Add table for event categories
```

**Step 2**: Create sample events
```
Generate 5 upcoming events in Thailand:
- Songkran Festival 2026
- Yi Peng Lantern Festival
- Full Moon Party (Koh Phangan)
- Chiang Mai Food Festival
- Bangkok Jazz Festival
```

**Step 3**: Build registration flow
```
Create eventsRouter with register, cancel, and myRegistrations endpoints
```

**Step 4**: Email notifications
```
Create event confirmation email template
Create event reminder email (24h before event)
```

---

## 💬 Example Conversations

### Getting Article Content

**You:**
> Create an article about the best vegan restaurants in Chiang Mai

**Agent (bilingual-content-generator):**
- Generates comprehensive bilingual article
- Includes 10+ restaurant recommendations
- Adds addresses, prices, menu highlights
- Provides ready-to-insert SQL

**You:**
> Add a section about vegan street food options

**Agent:**
- Updates the article with street food section
- Maintains bilingual format
- Updates SQL statement

---

### Building a Lesson

**You:**
> Build lesson 15: Making Friends and Social Situations

**Agent (thai-lesson-builder):**
- Creates 7 phrases about introductions, hobbies, invitations
- Writes dialogue about meeting someone at a cafe
- Generates 6 exercises
- Adds cultural tips about Thai social customs

**You:**
> Add 2 more phrases about asking someone to hang out

**Agent:**
- Adds phrases with proper male/female particles
- Updates exercise to include new phrases
- Maintains lesson structure

---

### Debugging Payments

**You:**
> My webhook isn't firing after checkout completes

**Agent (stripe-payment-debugger):**
- Checks webhook registration in code
- Verifies STRIPE_WEBHOOK_SECRET is set
- Tests signature verification
- Provides step-by-step debugging guide

**You:**
> How do I test this locally?

**Agent:**
- Explains Stripe CLI setup
- Provides exact commands to run
- Shows how to trigger test events

---

## 🎨 Advanced Usage

### Combining Multiple Agents

```
I want to launch a new feature: Event Registration System

1. Use database-migration-assistant to create the tables
2. Use bilingual-content-generator to write the Events page content
3. Use newsletter-composer to create event notification emails
4. Use stripe-payment-debugger to verify paid events will work correctly
```

### Iterative Refinement

```
Create article about Chiang Mai digital nomad guide

[After receiving output]

Make it more focused on Israeli digital nomads specifically
Add a section about Hebrew-speaking community in Chiang Mai
Include prices in both Baht and Shekels
```

### Custom Workflows

```
I need to create 10 articles this week. Help me batch create them:

1. Best beaches in Thailand
2. Thai visa rules for remote workers
3. Cost of living in Bangkok vs Chiang Mai
4. Thai language learning tips
5. Monsoon season: when to visit Thailand
6. Thai banking for foreigners
7. Transportation guide (BTS, MRT, Grab)
8. Thai food allergy phrases
9. Chabad houses in Thailand
10. Working remotely from Thailand tax implications
```

---

## 📊 Productivity Tips

### Time Savers

1. **Article in 5 minutes**:
   ```
   Create article about [topic] → Review → Insert to DB → Publish
   ```

2. **Lesson in 10 minutes**:
   ```
   Build lesson [N] → Add to data file → Test in browser
   ```

3. **Email in 3 minutes**:
   ```
   Create [email type] → Review HTML → Add send function → Test
   ```

### Quality Checklist

After agent generates content:

- [ ] Read through both Hebrew and English versions
- [ ] Check RTL formatting looks correct
- [ ] Verify links work
- [ ] Test SQL/code syntax
- [ ] Run through user flow
- [ ] Get feedback before publishing

---

## 🔄 Workflow Templates

### Daily Content Creation

**Morning**: 1 new article
```
Create article about [trending Thailand topic]
```

**Afternoon**: 1 new lesson component
```
Add dialogue to lesson [N]
```

**Evening**: Newsletter prep
```
Review week's articles and create Friday newsletter
```

### Weekly Tasks

**Monday**: Plan week's content
**Tuesday-Thursday**: Create articles (3 per week)
**Friday**: Send newsletter
**Weekend**: Build/improve lessons

### Monthly

**Week 1**: Content audit and planning
**Week 2**: New feature development (events, forum, etc.)
**Week 3**: Payment/analytics review
**Week 4**: Database optimization and cleanup

---

## 🎓 Learning Resources

### Understanding Your Agents

Each agent has detailed documentation:
- `.claude/agents/bilingual-content-generator.md`
- `.claude/agents/thai-lesson-builder.md`
- `.claude/agents/newsletter-composer.md`
- `.claude/agents/stripe-payment-debugger.md`
- `.claude/agents/database-migration-assistant.md`

### Example Prompts Library

**Content**:
- "Create listicle: Top 10 X in Thailand"
- "Write how-to guide: How to [do something]"
- "Generate comparison: X vs Y in Thailand"

**Technical**:
- "Add index to [table] for better query performance"
- "Create API endpoint for [feature]"
- "Debug why [feature] isn't working"

**Email**:
- "Create drip campaign: 5 emails over 2 weeks for new subscribers"
- "Design abandoned cart email"
- "Create re-engagement email for inactive users"

---

## ⚡ Power User Mode

### Batch Operations

```
Create 5 articles at once about different Thai islands:
- Koh Samui
- Koh Phangan
- Koh Tao
- Koh Lanta
- Koh Phi Phi
```

### Templates

Save your favorite prompts:
```bash
# In .claude/my-prompts.md
- "Create vegan restaurant article for [city]"
- "Build lesson about [topic]"
- "Debug [payment/webhook/email] issue"
```

### Automation Ideas

```
Set up weekly automation:
1. Monday: Generate 3 article ideas based on trending topics
2. Wednesday: Create newsletter draft
3. Friday: Send newsletter
4. Sunday: Generate analytics report
```

---

## 🎁 Your Turn!

**Try now**: Pick one prompt from above and run it!

Start simple:
```
Create a bilingual article about "5 Thai Phrases Every Tourist Should Know"
```

Then build on it:
```
Now create a full lesson from those 5 phrases
```

---

*You have 5 powerful agents at your disposal. Start using them!* 🚀
