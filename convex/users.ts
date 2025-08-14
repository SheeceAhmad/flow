import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args:{
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },
    
    handler: async(ctx, args) => {

        const existingUser = await ctx.db.query("users")
        .withIndex("by_clerk_id", (q)=> q.eq("clerkId", args.clerkId))
        .first()

        if (existingUser) return;

        else{
        await ctx.db.insert("users", {
            username: args.username,
            bio: args.bio,
            email: args.email,
            fullname: args.fullname,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0,
        })
        }
    }
}); 