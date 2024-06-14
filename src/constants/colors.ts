import { type Space } from '@/app/_spaces/interfaces/space'

const GRADIENT_COLORS_CONFIG = [
  {
    textColor: 'white',
    background: 'linear-gradient(0deg, rgba(69,61,224,1) 0%, rgba(177,20,145,1) 100%)',
  },
  {
    textColor: 'white',
    background: 'linear-gradient(180deg, rgba(69,61,224,1) 0%, rgba(177,20,145,1) 100%)',
  },
  {
    textColor: 'white',
    background: 'radial-gradient(circle, hsla(57, 100%, 48%, 1) 0%, hsla(204, 84%, 66%, 1) 100%)',
  },
  {
    textColor: 'black',
    background: 'linear-gradient(90deg, hsla(154, 100%, 76%, 1) 0%, hsla(234, 100%, 83%, 1) 50%, hsla(288, 100%, 81%, 1) 100%)',
  },
  {
    textColor: 'black',
    background: 'linear-gradient(180deg, hsla(154, 100%, 76%, 1) 0%, hsla(234, 100%, 83%, 1) 50%, hsla(288, 100%, 81%, 1) 100%)',
  },
  {
    textColor: 'black',
    background: 'linear-gradient(90deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)',
  },
  {
    textColor: 'black',
    background: 'linear-gradient(180deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)',
  },
  {
    textColor: 'white',
    background: 'radial-gradient(circle, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
  },
  {
    textColor: 'white',
    background: 'linear-gradient(90deg, hsla(0, 52%, 29%, 1) 0%, hsla(240, 51%, 63%, 1) 100%)',
  },
  {
    textColor: 'white',
    background: 'radial-gradient(circle, hsla(0, 52%, 29%, 1) 0%, hsla(240, 51%, 63%, 1) 100%)',
  },
]
  
export const GRADIENT_COLORS_MAP = new Map(GRADIENT_COLORS_CONFIG.map((gradient) => [gradient.background, gradient]))
  
export const GRADIENT_COLORS = GRADIENT_COLORS_CONFIG.map(({ background }) => background)
   
export const COLORS: string[] = [
  // Blue
  '#EFF6FF',
  '#DBEAFE',
  '#BFDBFE',
  '#93C5FD',
  '#60A5FA',
  '#3B82F6',
  '#2563EB',
  '#1D4ED8',
  '#1E40AF',
        
  // Amber
  '#FFFBEB',
  '#FEF3C7',
  '#FDE68A',
  '#FCD34D',
  '#FBBF24',
  '#F59E0B',
  '#D97706',
  '#B45309',
  '#92400E',
        
  // Pink
  '#FCE7F3',
  '#FBCFE8',
  '#F9A8D4',
  '#F472B6',
  '#EC4899',
  '#DB2777',
  '#BE185D',
  '#9D174D',
  '#831843',
        
  // Grey
  '#F9FAFB',
  '#F3F4F6',
  '#E5EBF0',
  '#D1D9E6',
  '#9CA3AF',
  '#6B7280',
  '#4B5563',
  '#374151',
  '#1F2937',
]

export const DEFAULT_STYLE: Space['style'] = {
  background: {
    type: 'color',
    value: COLORS[2] ?? ''
  },
  textColor: 'white'
}