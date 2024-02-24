import { createTRPCRouter } from '@/server/api/trpc'

import { spaceRouter } from './space/router'
import { whiteboardRouter } from './whiteboard/router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  whiteboard: whiteboardRouter,
  space: spaceRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
