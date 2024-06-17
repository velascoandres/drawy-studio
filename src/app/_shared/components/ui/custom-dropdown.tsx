import React, { useMemo, useState } from 'react'
import { CheckCircle2Icon, ChevronDown } from 'lucide-react'

import { ScrollArea } from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'

export interface DropdownItem<T> {
    value: number | string
    label: string
    data: T
}

interface Props <T> {
    title?: string
    items: DropdownItem<T>[]
    placeholder?: string
    searchLabel?: string
    value?: number | string
    emptyState?: string
    renderActions?: () => React.ReactNode  
    onSelect:(item: DropdownItem<T>) => void 
    children: (item: DropdownItem<T>, selected: boolean) => React.ReactNode
}


export const CustomDropdown =  <T,>({
  title,
  items,
  value,
  searchLabel = 'Search',
  placeholder = 'Select an option',
  emptyState = 'No option found.',
  onSelect,
  children: renderItem,
  renderActions,
}: Props<T>) => {
  const [currentValue, setSelectedValue] = useState(value?.toString())
  const [isOpen, setOpen] = useState(false)

  const valueContent = useMemo(() => {
    const option = items.find((item) => item.value.toString() === currentValue)

    if (!option){
      return placeholder
    }

    return renderItem(option, true)
  }, [currentValue, items, placeholder, renderItem])  

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[180px] justify-between"
        >
          {valueContent}
          {
            <ChevronDown className={
              cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-all ease-in rotate-0', {
                ['rotate-180']: isOpen
              })
            } />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder={searchLabel} />
          <CommandEmpty>{emptyState}</CommandEmpty>
          <CommandGroup>
            <h3 className="text-sm text-primary/65 font-medium text-pretty mx-2 my-1">{title}</h3>
          </CommandGroup>
          <ScrollArea className="max-h-[200px] overflow-y-scroll">
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  className="cursor-pointer my-1"
                  onSelect={() => {
                    setSelectedValue(item.value.toString())
                    setOpen(false)
                    onSelect(item)
                  }}
                >
                  <div className="inline-flex justify-start gap-2 w-full items-center">
                    {renderItem(item, currentValue === item.value.toString())}
                    {
                      currentValue === item.value.toString() && <CheckCircle2Icon className="w-5 h-5 text-primary/65"/>
                    }  
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
          <CommandGroup>
            {
              renderActions && (
                <div className="mt-2 flex flex-col justify-center">
                  <Separator />
                  {renderActions()}
                </div>
              )
            }
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

