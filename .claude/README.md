# Thailand Hayom Claude Code Plugin

This plugin provides specialized agents for developing the Thailand Hayom platform.

## 🤖 Available Agents

### 1. bilingual-content-generator
**Purpose**: Generate bilingual Hebrew/English content for articles, events, and lessons

**Use when**:
- Creating new articles for the newsletter
- Adding events to the calendar
- Writing bilingual page content

**What it does**:
- Translates between Hebrew and English naturally (not literal)
- Ensures proper RTL formatting for Hebrew
- Maintains database schema structure (title/titleHe, content/contentHe)
- Generates ready-to-insert SQL statements
- Suggests related content for internal linking

**Example**:
```
"Generate an article about best vegan restaurants in Chiang Mai"
```

---

### 2. thai-lesson-builder
**Purpose**: Build comprehensive Thai language lessons with phrases, dialogues, and exercises

**Use when**:
- Expanding the 30 Thai lessons (currently lessons 11-30 need content)
- Adding dialogues to existing lessons
- Creating practice exercises

**What it does**:
- Generates Thai phrases with transliteration and Hebrew/English translations
- Creates realistic Thai-Hebrew dialogues for travel scenarios
- Designs interactive exercises (multiple choice, fill-blank, matching)
- Adds cultural tips and usage notes
- Outputs TypeScript code ready to use

**Example**:
```
"Build Lesson 11: Weather & Seasons"
```

---

### 3. newsletter-composer
**Purpose**: Create bilingual email newsletters and templates for subscribers

**Use when**:
- Sending weekly newsletters to subscribers
- Creating transactional emails (welcome, purchase confirmation)
- Designing premium alert emails

**What it does**:
- Writes engaging bilingual email content
- Designs mobile-responsive HTML templates
- Integrates with Resend API
- Adds proper unsubscribe links and tracking
- Handles both free and premium subscriber content

**Example**:
```
"Create weekly newsletter for December 15, 2025"
```

---

### 4. stripe-payment-debugger
**Purpose**: Debug and test Stripe payment integration

**Use when**:
- Payment checkout not working
- Webhooks not firing or failing
- Emails not sent after payment
- Currency showing wrong (THB instead of ILS)

**What it does**:
- Diagnoses common Stripe issues
- Tests webhook event handling
- Verifies ILS currency configuration
- Checks email delivery after payment
- Provides step-by-step fixes

**Example**:
```
"Payment completes but no email is sent to customer"
```

---

### 5. database-migration-assistant
**Purpose**: Help create and manage PostgreSQL database migrations using Drizzle ORM

**Use when**:
- Adding new database tables
- Modifying existing schema
- Creating relationships between tables
- Need to understand database structure

**What it does**:
- Generates Drizzle ORM schema code
- Creates TypeScript types automatically
- Runs migrations safely
- Provides query examples
- Updates documentation

**Example**:
```
"Create a table for event registrations with userId and eventId foreign keys"
```

---

## 🎯 How to Use

Agents are automatically available when you work in this repository. Claude Code will:
1. **Auto-detect** when an agent would be helpful based on your request
2. **Suggest** the appropriate agent to use
3. **Invoke** the agent with context about your codebase

You can also explicitly invoke an agent by mentioning it:
```
"Use the bilingual-content-generator to create an article about Songkran festival"
```

---

## 📝 Skills (Coming Soon)

Planned skills for quick commands:
- `/add-trpc-route [name]` - Scaffold new tRPC API route
- `/create-bilingual-page [name]` - Create new bilingual React page
- `/generate-article [topic]` - Quick article generation
- `/add-db-table [name]` - Interactive table creation
- `/test-stripe-webhook [event]` - Test Stripe webhook locally
- `/seed-sample-data [type]` - Generate test data
- `/check-bilingual` - Audit pages for missing Hebrew translations

---

## 🔧 Configuration

The plugin is configured in `.claude/plugin.json`.

All agents have:
- ✅ **autoDiscovery**: true (automatically suggested by Claude Code)
- ✅ **Color coding**: For easy identification in UI
- ✅ **Full tool access**: Read, Write, Edit, Bash, Grep, Glob

---

## 📚 Documentation

Each agent includes:
- **Role description**: What the agent specializes in
- **Process guidelines**: How the agent approaches tasks
- **Code examples**: Reference implementations
- **Best practices**: Tips for the specific domain
- **Common issues**: Known problems and solutions

Read the individual agent files in `.claude/agents/` for detailed documentation.

---

## 🚀 Getting Started

1. **Open this repo in Claude Code CLI**
2. **Ask for help with a task**, for example:
   - "Create a bilingual article about Thai visa requirements"
   - "Build Thai lesson 15: Technology & Internet"
   - "Debug why Stripe webhook isn't working"
3. **Claude Code will automatically suggest** the relevant agent
4. **The agent will guide you** through the task with context-aware assistance

---

## 🛠️ Development

To modify or add agents:

1. **Edit agent files** in `.claude/agents/`
2. **Update plugin.json** if adding/removing agents
3. **Restart Claude Code** to reload the plugin

Agent file structure:
```markdown
---
description: Brief description
tools:
  - Read
  - Write
  - Bash
color: blue
---

Agent system prompt here...
```

---

## 💡 Tips

- **Be specific** in your requests: "Create article about X" vs "Help me"
- **Reference existing patterns**: Agents will read your codebase for consistency
- **Iterate**: Agents can refine output based on feedback
- **Combine agents**: Use multiple agents for complex tasks

---

## 🐛 Troubleshooting

**Agent not appearing?**
- Check `plugin.json` is valid JSON
- Ensure agent file exists in `.claude/agents/`
- Restart Claude Code CLI

**Agent output doesn't match codebase?**
- Agents read your actual files for context
- Try: "Read the existing articles first, then create a new one"

**Need help?**
- Check individual agent documentation in `.claude/agents/`
- See main project documentation in `CLAUDE.md`
- Review local setup guide in `LOCAL_SETUP.md`

---

Happy developing! 🇹🇭 ✈️
