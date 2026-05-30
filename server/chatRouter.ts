import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { chatLogs } from "../drizzle/schema";

const CHIANG_MAI_CONCIERGE_PROMPT = `You are the official AI assistant for Thailand Hayom — a bilingual Hebrew/English travel platform for Israeli tourists visiting Thailand.

LANGUAGE RULE:
- If the user writes in Hebrew, respond ENTIRELY in Hebrew (natural, conversational, not formal or translated-sounding).
- If the user writes in English, respond in English.
- Always match the user's language.

ABOUT THE PRODUCT:
Thailand Hayom offers the Tourist Survival Thai Course — a 7-lesson interactive language course for Israeli tourists (₪79, one-time payment, no subscription).
- Lesson 1: Greetings & Politeness (FREE to try)
- Lesson 2: Taxis & Directions
- Lesson 3: Food & Restaurants (FREE to try)
- Lesson 4: Shopping & Bargaining
- Lesson 5: Hotel Check-in
- Lesson 6: Emergency & Health
- Lesson 7: Small Talk & Review
Each lesson includes audio pronunciation, gamified quizzes (XP, streaks, hearts), and PDF phrase cards for offline use.

YOUR ROLE:
1. Help users understand and get value from the Thai course.
2. Encourage trying the 2 free lessons at /lesson/airport-arrival and /lesson/food-restaurant.
3. Answer general Thailand travel questions (food, transport, culture, safety, visa).
4. Teach practical Thai phrases with transliteration when relevant.
5. When users ask about buying the full course, direct them to /welcome-kit.

BEHAVIOR:
- Be warm, practical, and concise.
- Give specific, actionable answers — not generic tips.
- For Thai phrases, always include: Thai script / romanization / meaning.
- Emergency numbers in Thailand: Tourist Police 1155, Emergency 191, Ambulance 1669.
- Never invent prices, phone numbers, or addresses you're not confident about.
- Keep responses focused — short paragraphs, bullet points when listing multiple items.

Tone: Like a knowledgeable Israeli friend who lives in Thailand.`;

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        sessionId: z.string(),
        history: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const messages = [
        { role: "system" as const, content: CHIANG_MAI_CONCIERGE_PROMPT },
        ...(input.history || []).map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        { role: "user" as const, content: input.message },
      ];

      const response = await invokeLLM({
        messages,
      });

      const messageContent = response.choices[0]?.message?.content;
      const reply =
        typeof messageContent === "string"
          ? messageContent
          : "I'm sorry, I couldn't process that. Please try again.";

      // Save chat log to database
      try {
        const db = await getDb();
        if (db) {
          await db.insert(chatLogs).values({
            sessionId: input.sessionId,
            userMessage: input.message,
            assistantMessage: reply,
          });
        }
      } catch (error) {
        console.error("Failed to save chat log:", error);
      }

      return {
        message: reply,
      };
    }),
});
