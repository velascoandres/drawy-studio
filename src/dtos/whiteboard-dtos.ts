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
  content: z.object({
    elements: z.array(z.object({
      type: z.string(),
      version: z.number(),
      versionNonce: z.string(),
      isDeleted: z.boolean(),
      id: z.string(),
      fillStyle: z.string(),
      strokeWidth: z.number(),
      strokeColor: z.string(),
      backgroundColor: z.string(),
      width: z.number(),
      height: z.number(),
      x: z.number(),
      y: z.number(),
      seed: z.number(),
      groupIds: z.array(z.string()),
      boundElements: z.any(),
      locked: z.boolean(),
      link: z.any(),
      updated: z.number(),
      roundness: z.object({
        type: z.number(),
        value: z.number(),
      }),
    }).partial()),
    appState: z.object({
      viewBackgroundColor: z.string()
    })
  }),
})