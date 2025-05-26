import BaseQueryProvider from '@/services/baseQueryProvider'
import React, { FC, PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const Layoutwrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='h-screen overflow-auto'>
        <BaseQueryProvider>
            <>
                <Toaster />
                {children}
            </>
        </BaseQueryProvider>
    </div>
  )
}

export default Layoutwrapper