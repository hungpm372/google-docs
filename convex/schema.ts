import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
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
  })
    .index('by_owner_id', ['ownerId'])
    .index('by_organization_id', ['organizationId'])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['ownerId', 'organizationId']
    })
})
