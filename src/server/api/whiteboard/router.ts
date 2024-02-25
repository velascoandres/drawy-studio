import { SearchByIdDto } from '@/dtos/shared-dtos'
import { SearchUserSpaceDto } from '@/dtos/space-dtos'
import { 
  CreateWhiteboardDto, 
  UpdateWhiteboardContentDto, 
  UpdateWhiteboardDto 
} from '@/dtos/whiteboard-dtos'
import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc'

import createWhiteboard from './usecases/create-whiteboard'
import detachUserWhiteboardFromSpace from './usecases/detach-whiteboard-space'
import findUserWhiteboardById from './usecases/find-user-whiteboard-by-id'
import findUserWhiteboards from './usecases/find-user-whiteboards'
import removeUserWhiteboard from './usecases/remove-user-whiteboard'
import updateUserWhiteboard from './usecases/update-user-whiteboard'
import updateUserWhiteboardContent from './usecases/update-whiteboard-content'

export const whiteboardRouter = createTRPCRouter({
  createWhiteboard: protectedProcedure.input(CreateWhiteboardDto)
  .mutation(({ ctx, input }) => createWhiteboard(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  updateUserWhiteboardInfo: protectedProcedure.input(UpdateWhiteboardDto)
  .mutation(({ ctx, input }) => updateUserWhiteboard(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  updateUserWhiteboardContent: protectedProcedure.input(UpdateWhiteboardContentDto)
  .mutation(({ ctx, input }) => updateUserWhiteboardContent(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  removeUserWhiteboard: protectedProcedure.input(SearchByIdDto)
  .mutation(({ ctx, input }) => removeUserWhiteboard(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  detachWhiteboardFromSpace: protectedProcedure.input(SearchByIdDto)
  .mutation(({ ctx, input }) => detachUserWhiteboardFromSpace(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  findUserWhiteboards: protectedProcedure.input(SearchUserSpaceDto)
  .query(({ ctx, input }) => findUserWhiteboards(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  findUserWhiteboardById: protectedProcedure.input(SearchByIdDto)
  .query(({ ctx, input }) => findUserWhiteboardById(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
})