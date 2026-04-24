import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const taskStatusEnum = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof taskStatusEnum)[number];

export const tasksTable = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  externalId: text("external_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  category: text("category").notNull(),
  timeEstimate: text("time_estimate").notNull().default(""),
  difficulty: text("difficulty").notNull().default("Medium"),
  status: text("status").notNull().default("todo"),
});

export const insertTaskSchema = createInsertSchema(tasksTable).omit({ id: true });
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasksTable.$inferSelect;
