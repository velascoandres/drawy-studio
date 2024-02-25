'use client'

import React from 'react'
import { Plus } from 'lucide-react'

import { Button } from '../ui/button'
import { SearchBox } from '../ui/search-box'

interface Props {
    title: string
    searchPlaceholder?: string
    children: React.ReactNode
    addLabel: string
    searchValue?: string
    onAddClick: () => void
    onSearch: (search: string) => void
}

export const ManagementPageLayout = ({
  title, 
  searchPlaceholder = 'Search',
  children,
  addLabel,
  onAddClick,
  searchValue,
  onSearch,
}: Props) => {
  return (
    <main className="overflow-y-auto py-2 flex flex-col gap-4 items-start min-h-screen w-full">  
      <header className="px-4 py-2 z-10 fixed top-0 w-full flex flex-row flex-wrap items-center border border-transparent border-b-gray-800 gap-2">
        <h1 className="text-3xl font-bold hidden xl:block">{title}</h1>
        <div className="md:basis-2/3 flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
          <div className="basis-1/2">
            <SearchBox placeholder={searchPlaceholder} onSearch={onSearch} value={searchValue} />
          </div>  
          <Button variant="secondary" onClick={onAddClick} className="hidden bg-neutral-800 border-none z-0 p-2 px-4 w-auto md:flex flex-row gap-2 justify-center items-center rounded-md">
            <Plus className="w-auto md:h-auto" /> <span className="hidden md:block">{addLabel}</span>
          </Button>
        </div>
      </header>
      <section className="flex-1 flex flex-col px-4 pt-20 w-full h-full">
        {children}
      </section>  
      <Button variant="secondary" onClick={onAddClick} className="bg-neutral-900 md:hidden fixed bottom-24 right-4 border border-white z-10 p-2 py-8 flex flex-row justify-center items-center rounded-full">
        <Plus className="w-12 h-12 md:hidden" /> <span className="hidden md:block">{addLabel}</span>
      </Button>
    </main>
  )
}