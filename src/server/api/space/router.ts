import { SearchByIdDto, SearchDto } from '@/dtos/shared-dtos'
import { 
  AttachWhiteboardSpaceDto,
  CreateSpaceDto, 
  UpdateSpaceDto,
} from '@/dtos/space-dtos'

import { createTRPCRouter, protectedProcedure } from '../trpc'

import attachWhiteboardToSpace from './usecases/attach-whiteboard-space'
import createSpace from './usecases/create-user-space'
import findUserSpaceById from './usecases/find-space-by-id'
import findUserSpaces from './usecases/find-user-spaces'
import removeUserSpace from './usecases/remove-user-space'
import updateUserSpace from './usecases/update-user-space'

export const spaceRouter = createTRPCRouter({
  createSpace: protectedProcedure.input(CreateSpaceDto)
  .mutation(({ ctx, input }) => createSpace(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  updateUserSpace: protectedProcedure.input(UpdateSpaceDto)
  .mutation(({ ctx, input }) => updateUserSpace(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  attachWhiteboardToSpace: protectedProcedure.input(AttachWhiteboardSpaceDto)
  .mutation(({ ctx, input }) => attachWhiteboardToSpace(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  removeSpace: protectedProcedure.input(SearchByIdDto)
  .mutation(({ ctx, input }) => removeUserSpace(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  findUserSpaceById: protectedProcedure.input(SearchByIdDto)
  .query(({ ctx, input }) => findUserSpaceById(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  })),
  findUserSpaces: protectedProcedure.input(SearchDto)
  .query(({ ctx, input }) => findUserSpaces(ctx.db, {
    ...input,
    userId: ctx.session.user.id
  }))
})