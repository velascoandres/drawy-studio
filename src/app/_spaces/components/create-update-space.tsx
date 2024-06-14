'use client'
import React from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/_shared/components/ui/button'
import { ColorSelector } from '@/app/_shared/components/ui/color-selector'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/_shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_shared/components/ui/form'
import { Input } from '@/app/_shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_shared/components/ui/select'
import { COLORS, DEFAULT_STYLE, GRADIENT_COLORS, GRADIENT_COLORS_MAP } from '@/constants/colors'
import { CreateSpaceDto } from '@/dtos/space-dtos'
import { getTextColor } from '@/lib/get-text-color'
import { cn } from '@/lib/utils'

import { useCreateSpace } from '../hooks/use-create-space'
import { useUpdateSpace } from '../hooks/use-update-space'
import { type Space } from '../interfaces/space'

import { SpaceCard } from './space-card'


interface Props {
	space?: Space
}

export const CreateUpdateSpace = ({ 
  space,
}: Props) => {

  const { createSpace, isCreating } = useCreateSpace()  
  const { updateSpace, isUpdating } = useUpdateSpace()
    
  const form = useForm<z.infer<typeof CreateSpaceDto>>({
    resolver: zodResolver(CreateSpaceDto),
    defaultValues: {
      name: space?.name ?? '',
      description: space?.description ?? '',
      style: space?.style ?? DEFAULT_STYLE
    },
  })

  const onSubmit = (values: z.infer<typeof CreateSpaceDto>) => {
    if (space) {
      updateSpace({
        ...values,
        id: space.id,
      })

      return
    }

    createSpace({
      ...values,
    })
  }

  const handleColorSelection = (selectedColor: string) => {
    form.setValue('style.background.value', selectedColor)
    if (form.getValues('style.background.type') === 'color'){
      form.setValue('style.textColor', getTextColor(selectedColor))
    } else {
      form.setValue('style.textColor', GRADIENT_COLORS_MAP.get(selectedColor)?.textColor)
    }
  }

  return (
    <DialogContent 
      className="h-screen xl:h-auto md:max-w-3xl overflow-y-auto" 
      preventCloseClickOutside
      preventScapeKeydown
    >
      <DialogHeader>
        <DialogTitle>{space ? 'Space information' : 'Add new Space'} </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col md:flex-row w-full gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My roadmaps"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
					                This is your space name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style.background.type"
                render={({ field }) => (
                  <FormItem className="w-full" >
                    <FormLabel>Background type</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={(type: 'color' | 'gradient') => form.setValue('style.background.type', type) }>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Background type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="color">Color</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
					              Select a background type
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="overflow-y-auto max-h-64 p-2">
              <ColorSelector 
                value={form.getValues('style.background.value')}
                onSelect={handleColorSelection} 
                options={form.watch('style.background.type') === 'gradient' ? GRADIENT_COLORS : COLORS} 
              />
            </div>   
          </div>

          <h3 className="font-bold">Space preview</h3>

          <div className="flex-1 inline-flex justify-center w-full">
            <SpaceCard
              title={`${form.watch('name') || '⚽️ name'}`}
              background={`${form.watch('style')?.background.value ?? DEFAULT_STYLE.background.value}`} 
            />
          </div>
          

          <DialogFooter>
            <Button
              disabled={ isCreating || isUpdating  }
              type="submit"

            >
              <div className="flex justify-start items-center gap-2">
                <Loader2 
                  className={cn('hidden',{
                    'block animate-spin': isCreating || isUpdating,
                  })}
			    />
				      Save changes
              </div>

            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  )
}