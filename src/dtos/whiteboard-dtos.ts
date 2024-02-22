import { z } from 'zod'

export const CreateWhiteboardDto = z.object({
  name: z.string().min(2),
  description: z.string().optional()
})

export const UpdateWhiteboardDto = z.object({
  id: z.number(),
}).merge(CreateWhiteboardDto)

export const UpdateWhiteboardContentDto = z.object({
  id: z.number(),
  content: z.unknown(),
  // content: z.object({
  //   scene: z.object({
  //     elements: z.array(z.object({
  //       type: z.string(),
  //       version: z.number(),
  //       versionNonce: z.number(),
  //       isDeleted: z.boolean(),
  //       id: z.string(),
  //       fillStyle: z.string(),
  //       strokeWidth: z.number(),
  //       strokeColor: z.string(),
  //       backgroundColor: z.string(),
  //       width: z.number(),
  //       height: z.number(),
  //       x: z.number(),
  //       y: z.number(),
  //       seed: z.number(),
  //       boundElements: z.any(),
  //       locked: z.boolean(),
  //       link: z.any(),
  //       updated: z.number(),
  //     }).partial()),
  //     appState: z.object({
  //       viewBackgroundColor: z.string()
  //     })
  //   })
  // }),
})