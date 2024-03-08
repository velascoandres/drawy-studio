'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/_shared/components/ui/button'
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
  FormMessage 
} from '@/app/_shared/components/ui/form'
import { Input } from '@/app/_shared/components/ui/input'
import { Switch } from '@/app/_shared/components/ui/switch'
import { Textarea } from '@/app/_shared/components/ui/textarea'
import { CreateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import { cn } from '@/lib/utils'

import { useCreateWhiteboard } from '../hooks/use-create-whiteboard'
import { useUpdateWhiteboard } from '../hooks/use-update-whiteboard'

interface Props {
  whiteboard?: z.infer<typeof CreateWhiteboardDto> & { id: number }
  targetSpaceId?: number
}


export const CreateUpdateWhiteboard = ({
  whiteboard,
  targetSpaceId
}: Props) => {
  const { create, isLoading: isCreating } = useCreateWhiteboard()
  const { update, isLoading: isUpdating } = useUpdateWhiteboard()
  
  const form = useForm<z.infer<typeof CreateWhiteboardDto>>({
    resolver: zodResolver(CreateWhiteboardDto),
    defaultValues: {
      name: whiteboard?.name ?? '',
      description: whiteboard?.description ?? '',
      spaceId: targetSpaceId ?? null,
      isPublic: whiteboard?.isPublic ?? false,
    },
  })

  const handleSubmit = (formValue: z.infer<typeof CreateWhiteboardDto>) => {
    if (whiteboard){
      update({
        ...formValue,
        id: whiteboard.id,
        spaceId: whiteboard.spaceId,
      })
    } else {
      create({
        ...formValue,
      })
    }
  }


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{whiteboard ? 'Update' : 'Create'} whiteboard</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Free books"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    Type your whiteboard name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full" >
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5} 
                    placeholder="Roadmap to learn..." 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                    Provide a short description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Visibility</FormLabel>
                  <FormDescription>
                      Make this whiteboard <strong className="font-bold text-destructive text-base">public</strong>. 
                    <p className="text-xs">
                      The content of the whiteboard can be shared through a given public link but cannot be edited (read-only mode).
                    </p>
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              disabled={ isCreating || isUpdating  }
              type="submit"
            >
              <div className="flex justify-center md:justify-start items-center gap-2">
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
    </DialogContent>
  )
}
