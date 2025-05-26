"use client";

import React from 'react'
import AuthForm from './components/AuthForm'
import useIsClient from '@/hooks/useIsClient';

const Authentications = () => {
  const isClient = useIsClient();

  if(!isClient) return null;
  return (
    <div className="flex flex-col min-h-screen w-full bg-web3-bg">
      <div 
        className="w-full h-full flex-1 flex flex-col items-center justify-center p-6 bg-gradient-radial from-web3-bg to-web3-card relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-web3-accent to-web3-accent2"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          <div className="flex flex-col space-y-4 text-center lg:text-left max-w-md mx-auto lg:mx-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-web3-accent to-web3-accent2 bg-clip-text text-transparent">Nexus</span> Chat
            </h1>
            <p className="text-lg md:text-xl text-zinc-400">
              A next-generation messaging platform for seamless, secure communication
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-web3-bg bg-gradient-to-br from-web3-accent to-web3-accent2"
                  ></div>
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                Join 2,000+ users
              </span>
            </div>
          </div>
          
          <div className="w-full max-w-md animate-fade-in">
            <AuthForm />
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-web3-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-web3-accent2/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default Authentications