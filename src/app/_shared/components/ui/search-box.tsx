'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'

import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'

import { Input } from './input'

interface Props {
	value?: string
  placeholder?: string
	onSearch: (search: string) => void
}


export const SearchBox = ({ value, onSearch, placeholder = 'Search something' }: Props) => {

  const debounce = useDebounceCallback()

  const [inputValue, setInputValue] = useState(value)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt

    setInputValue(value)

    debounce(() => onSearch(value))
  }

  return (
    <div className="relative py-2 w-full">
      <Search className="absolute z-10 left-2 top-4" />
      <Input
        value={inputValue}
        placeholder={placeholder}
        className="w-full pl-10"
        onChange={handleChange}
      />
    </div>
  )
}
