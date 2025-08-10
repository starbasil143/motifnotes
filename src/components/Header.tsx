'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@heroui/react";
import { Menu } from 'lucide-react';
import { Howl, Howler } from "howler";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { signIn } from '@/auth';

export default function Header() {

  const { data: session } = useSession();
  const sound = new Howl({
    src: ['http://localhost:3000/splat.mp3']
  })

  return (
    <header className='w-full h-14 top-0 z-40 sticky backdrop-blur-md bg-white/[.90] dark:bg-black/[.45] items-center flex justify-around gap-4'>
      
      <Button onPress={()=>sound.play()} isIconOnly color='primary' variant='light' className='p-0.5'>
        <Image alt='Squishable Fellow' src='http://localhost:3000/lancer.webp' className='pointer-events-none'/>
      </Button>
      <h1 className='font-bold text-2xl'>
        <Link href='/'>MotifNotes?? or something idk</Link>
      </h1>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='faded' className='max-w-2'><Menu /></Button>
        </DropdownTrigger>

          {session?.user?(
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key="notes" href='/notes/user'>Your Notes</DropdownItem>
              <DropdownItem key="new" href='/notes/create'>New Note</DropdownItem>
              <DropdownItem key="account" href='/account' color='primary' className='text-primary'>Account</DropdownItem>
            </DropdownMenu>
          ):(
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key="signin" href='/signin'>Sign In</DropdownItem>
            </DropdownMenu>
          )}
      </Dropdown>
    </header>
  )
}