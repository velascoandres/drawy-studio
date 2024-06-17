import { DEFAULT_STYLE } from '@/constants/colors'
import { StyleDto } from '@/dtos/space-dtos'

import { type SpaceSummary } from '../interfaces/space'

interface RawSpace {
    id: number;
    name: string;
    description: string | null
    style: unknown; 
    totalWhiteboards?: number
}
  
export const transformSpace = (space?: RawSpace | null): SpaceSummary => {
  const styleValidation = StyleDto.safeParse(space?.style)

  return {
    id: space?.id ?? 0,
    name: space?.name ?? '',
    description: space?.description ?? '',
    style: styleValidation.success ? styleValidation.data : DEFAULT_STYLE, 
    totalWhiteboards: space?.totalWhiteboards ?? 0
  }
}
