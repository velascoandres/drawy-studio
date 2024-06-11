import React, { useMemo, useState } from 'react'
import { CheckCircle2Icon, ChevronDown, Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'

export interface DropdownItem {
    value: number | string
    label: string
    data: unknown
}

interface Props {
    title?: string
    items: DropdownItem[]
    placeholder?: string
    searchLabel?: string
    value?: number | string
    emptyState?: string
    renderActions?: () => React.ReactNode  
    onSelect: (item: DropdownItem) => void 
    children: (item: DropdownItem, selected: boolean) => React.ReactNode
}


export const CustomDropdown = ({
  title,
  items,
  value,
  searchLabel = 'Search',
  placeholder = 'Select an option',
  emptyState = 'No option found.',
  onSelect,
  children: renderItem,
  renderActions,
}: Props) => {
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

