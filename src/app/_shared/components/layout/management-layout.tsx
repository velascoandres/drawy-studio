'use client'

import React from 'react'
import { Plus } from 'lucide-react'

import { Button } from '../ui/button'
import { SearchBox } from '../ui/search-box'
interface Props {
    title: string
    searchPlaceholder?: string
    children: React.ReactNode
    searchValue?: string
    extraActions?: [React.ReactNode]
    addLabel: string
    onAddClick: () => void
    onSearch: (search: string) => void
}

export const ManagementPageLayout = ({
  title, 
  searchPlaceholder = 'Search',
  children,
  addLabel,
  onAddClick,
  extraActions,
  searchValue,
  onSearch,
}: Props) => {
  return (
    <main className="overflow-y-auto py-2 flex flex-col gap-4 items-start min-h-screen w-full">  
      <header className="px-4 py-2 z-10 fixed top-0 w-full flex flex-row flex-wrap items-center border border-transparent border-b-border gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="md:basis-2/3 w-full flex flex-row justify-start md:justify-center items-center gap-2">
          <div className="md:basis-1/2 w-full">
            <SearchBox placeholder={searchPlaceholder} onSearch={onSearch} value={searchValue} />
          </div>  
          <Button variant="outline" onClick={onAddClick} className="hidden  z-0 py-1 px-4 w-auto md:flex flex-row gap-2 justify-center items-center">
            <Plus className="w-auto md:h-auto" /> <span className="hidden md:block">{addLabel}</span>
          </Button>
          {extraActions}
        </div>
      </header>
      <section className="flex-1 flex flex-col px-4 pt-32 md:pt-20 w-full h-full">
        {children}
      </section>  
      <Button variant="default" onClick={onAddClick} className="md:hidden fixed bottom-24 right-4 border z-10 p-2 py-8 flex flex-row justify-center items-center rounded-full">
        <Plus className="w-12 h-12 md:hidden" /> <span className="hidden md:block">{addLabel}</span>
      </Button>
    </main>
  )
}