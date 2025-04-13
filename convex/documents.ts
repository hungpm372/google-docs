import { paginationOptsValidator } from 'convex/server'
import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthenticated user')
    }

    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled Document',
      ownerId: user.subject,
      initialContent: args.initialContent,
      signatures: []
    })
  }
})

export const get = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, { paginationOpts, search }) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthenticated user')
    }

    if (search)
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts)

    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts)
  }
})

export const removeById = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthenticated user')
    }

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError('Unauthorized to delete this document')
    }

    return await ctx.db.delete(args.id)
  }
})

export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
    signatures: v.optional(
      v.array(
        v.object({
          id: v.string(),
          src: v.string(),
          x: v.number(),
          y: v.number(),
          width: v.number(),
          height: v.number(),
          xPercent: v.optional(v.number()),
          yPercent: v.optional(v.number())
        })
      )
    )
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthenticated user')
    }

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError('Unauthorized to delete this document')
    }

    return await ctx.db.patch(args.id, {
      initialContent: args.initialContent ?? document.initialContent,
      title: args.title ?? document.title,
      signatures: args.signatures ?? document.signatures
    })
  }
})

export const getById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthenticated user')
    }

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError('Unauthorized to delete this document')
    }

    return document
  }
})
