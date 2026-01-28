#!/usr/bin/env tsx
/**
 * Validates that content has complete bilingual fields (Hebrew + English)
 * Usage: tsx validate-bilingual.ts <articles|events> <id1,id2,id3>
 */

import { getDb } from "../../../server/db";
import { articles, events } from "../../../drizzle/schema";
import { inArray } from "drizzle-orm";

async function validateBilingual(type: "articles" | "events", ids: number[]) {
  const db = await getDb();
  if (!db) {
    console.error("❌ Database not available");
    process.exit(1);
  }

  const table = type === "articles" ? articles : events;
  const items = await db.select().from(table).where(inArray(table.id, ids));

  let hasErrors = false;
  let hasWarnings = false;

  console.log(`\n🔍 Validating ${type}...\n`);

  for (const item of items) {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required bilingual fields
    if (!item.title) errors.push("Missing English title");
    if (!item.titleHe) errors.push("Missing Hebrew title (titleHe)");

    // Check optional but recommended fields
    if (type === "articles") {
      if (!item.excerpt && !item.excerptHe) {
        warnings.push("Missing both English and Hebrew excerpts");
      } else if (!item.excerpt) {
        warnings.push("Missing English excerpt");
      } else if (!item.excerptHe) {
        warnings.push("Missing Hebrew excerpt (excerptHe)");
      }
    }

    if (type === "events") {
      if (!item.description && !item.descriptionHe) {
        warnings.push("Missing both English and Hebrew descriptions");
      } else if (!item.description) {
        warnings.push("Missing English description");
      } else if (!item.descriptionHe) {
        warnings.push("Missing Hebrew description (descriptionHe)");
      }
    }

    // Display results
    if (errors.length > 0) {
      console.log(`❌ ${type.slice(0, -1)} #${item.id}: ${item.title || item.titleHe}`);
      errors.forEach((err) => console.log(`   - ${err}`));
      hasErrors = true;
    } else if (warnings.length > 0) {
      console.log(`⚠️  ${type.slice(0, -1)} #${item.id}: ${item.title || item.titleHe}`);
      warnings.forEach((warn) => console.log(`   - ${warn}`));
      hasWarnings = true;
    } else {
      console.log(`✅ ${type.slice(0, -1)} #${item.id}: ${item.title || item.titleHe}`);
    }
  }

  console.log("");

  if (hasErrors) {
    console.log("❌ Validation failed: Critical errors found");
    console.log("   Fix missing required fields before sending newsletter\n");
    process.exit(1);
  } else if (hasWarnings) {
    console.log("⚠️  Validation passed with warnings");
    console.log("   Consider adding missing optional fields for better user experience\n");
    process.exit(0);
  } else {
    console.log("✅ All content validated successfully\n");
    process.exit(0);
  }
}

// Parse command line arguments
const [contentType, idsString] = process.argv.slice(2);

if (!contentType || !idsString) {
  console.error("Usage: tsx validate-bilingual.ts <articles|events> <id1,id2,id3>");
  process.exit(1);
}

if (contentType !== "articles" && contentType !== "events") {
  console.error("Error: Content type must be 'articles' or 'events'");
  process.exit(1);
}

const ids = idsString.split(",").map((id) => parseInt(id.trim()));

validateBilingual(contentType, ids);
