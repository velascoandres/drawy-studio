import React from 'react'

interface Props {
    loading: boolean
    empty: boolean
    fallback: React.ReactNode
    emptyState: React.ReactNode

    children: React.ReactNode | React.ReactNode[]
}


export const ShowContent = ({
  children,
  loading,
  empty,
  emptyState,
  fallback
}: Props) => {
  return (
    <>
      {
        loading ? (fallback) : (
          empty ? emptyState : children
        )
      }
    </>
  )
}