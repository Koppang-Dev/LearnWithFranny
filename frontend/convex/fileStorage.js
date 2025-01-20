import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    userEmail: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      userEmail: args.userEmail,
      createdBy: args.createdBy,
    });
    return "Inserted";
  },
});
