'use client'

import React, { FC, ReactNode } from 'react'
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  dehydrate
} from 'react-query'
import { toast } from 'sonner'

interface BaseQueryProviderProps {
  children: ReactNode
}

interface ErrorResponse {
  data: {
    msg?: string;
  } | string;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error

  if (error && typeof error === 'object') {
    // Axios-like error
    if ('response' in error && error.response && typeof error.response === 'object') {
      const response = error.response as { data: ErrorResponse['data'] }
      if (typeof response?.data === 'object' && response?.data?.msg) return response?.data?.msg
      if (typeof response?.data === 'string') return response?.data
    }

    // Fetch-style error
    if ('message' in error && typeof error.message === 'string') {
      return error.message
    }
  }

  return 'Unknown error occurred'
}

const BaseQueryProvider: FC<BaseQueryProviderProps> = ({ children }) => {
  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation?.options?.onError) return
      const errorMessage = getErrorMessage(error)
      toast.error(`Something went wrong: ${errorMessage}`)
    }
  })

  const queryCache = new QueryCache({
    onError: (error) => {
      const errorMessage = getErrorMessage(error)
      toast.error(`Something went wrong: ${errorMessage}`)
    }
  })

  const queryClient = new QueryClient({ mutationCache, queryCache })
  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default BaseQueryProvider