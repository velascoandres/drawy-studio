import { DEFAULT_STYLE } from '@/constants/colors'
import { StyleDto } from '@/dtos/space-dtos'

import { type Space } from '../interfaces/space'

interface RawSpace {
    id: number;
    name: string;
    description: string | null
    style: unknown;
}
  

export const transformSpace = (space?: RawSpace | null): Space => {
  const styleValidation = StyleDto.safeParse(space?.style)

  return {
    id: space?.id ?? 0,
    name: space?.name ?? '',
    description: space?.description ?? '',
    style: styleValidation.success ? styleValidation.data : DEFAULT_STYLE 
  }
}
