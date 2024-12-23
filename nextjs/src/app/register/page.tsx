"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

export default function index() {
  return (
    <main className='flex flex-col max-w-[16rem] gap-2'>

        <Input type="email" placeholder="Email"/>

        <Input type="password" placeholder="Password"/>

        <Button
            onClick={() => console.log("Clicked")}
        >
            Create
        </Button>

    </main>
  )
}


