import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function withStopPropagation(actionHandler: () => void) {
  return function (evt:  React.MouseEvent<HTMLDivElement>) {
    evt.stopPropagation()
  
    actionHandler()
  }
}