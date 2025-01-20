import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    userEmail: v.string(),
  }),

  files: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    userEmail: v.string(),
    createdBy: v.string(),
  }),
});
