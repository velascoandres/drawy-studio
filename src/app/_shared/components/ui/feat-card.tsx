'use client'
import { type MouseEvent, useCallback,useState } from 'react'


interface Props {
    icon: JSX.Element, 
    title: string, 
    description: string
}

function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    
    return func(...args)
  }
}

export const FeatCard = ({ icon, title, description }: Props) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      const box = card.getBoundingClientRect()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      const centerX = box.width / 2
      const centerY = box.height / 2
      const rotateX = (y - centerY) / 4
      const rotateY = (centerX - x) / 4

      setRotate({ x: rotateX, y: rotateY })
    }, 100),
    []
  )

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <>
      <article
        className='card relative w-[350px] md:w-[300px] transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform px-2 py-4'
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
        }}
      >
        <div className="group transition px-4 py-6 ease-in relative flex flex-col backdrop-blur-sm justify-center items-center gap-2 h-full w-full select-none rounded-lg border border-neutral-700  hover:bg-gradient-to-br from-black to-indigo-950 hover:border-indigo-400 text-sm font-light text-gray-300">
          <div className="flex flex-col justify-center items-center w-full">
            {icon}
            <span className="text-xl text-pretty font-semibold group-hover:text-[#63e] transition-all ease-in">
              {title}
            </span>
          </div>
          <span className='transition ease-out duration-200 group-hover:text-gray-200 text-base/relaxed text-gray-400 text-center'>
            {description}
          </span>
        </div>
      </article>
    </>
  )
}