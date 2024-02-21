'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_shared/components/ui/form'
import { Input } from '@/app/_shared/components/ui/input'
import { Textarea } from '@/app/_shared/components/ui/textarea'
import { CreateWhiteboardDto } from '@/dtos/create-whiteboard.dto'


export const CreateUpdateWhiteboard = () => {  
  const form = useForm<z.infer<typeof CreateWhiteboardDto>>({
    resolver: zodResolver(CreateWhiteboardDto),
    defaultValues: {
      name: '',
      description: '',
    },
  })


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create whiteboard</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => null)} className="space-y-8 w-full">
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
          <DialogFooter>
            <Button
              
              type="submit"
              
            >
              <div className="flex justify-center md:justify-start items-center gap-2">
                
                   Save changes
              </div>

            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
