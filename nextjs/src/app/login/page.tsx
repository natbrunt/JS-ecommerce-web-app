"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
function page() {
  return (
    <main className='flex flex-col max-w-[16rem] gap-2'>

        <Input type="email" placeholder="Email"/>

        <Input type="password" placeholder="Password"/>

        <Button onClick={() => console.log("Clicked")}>Let's go</Button>

        <Link href="register/" className='text-center text-blue-700'>Register</Link>

    </main>
  )
}

export default page
