import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const userProfilesTable = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  role: text("role"),                       // "student" | "company"

  // ── Student fields ─────────────────────────────────────────────────────────
  gender: text("gender"),
  age: integer("age"),
  major: text("major"),
  targetJob: text("target_job"),
  targetCompany: text("target_company"),

  // ── Company fields ─────────────────────────────────────────────────────────
  companyName: text("company_name"),
  industry: text("industry"),
  companySize: text("company_size"),        // "1-10" | "11-50" | "51-200" | "201-1000" | "1000+"
  companyDescription: text("company_description"),
  hiringRoles: text("hiring_roles"),        // comma-separated list of open roles (optional)
  companyWebsite: text("company_website"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserProfile = typeof userProfilesTable.$inferSelect;
export type InsertUserProfile = typeof userProfilesTable.$inferInsert;
