'use client'
import { Button } from "@heroui/react";
import { Howl, Howler } from 'howler';

export default function AccountPage() {

  const sound = new Howl({
    src: ['win31.mp3']
  })

  return (
    <div className='min-h-100 min-w-full flex justify-center align-middle items-center'>
      <Button className='text-3xl'  onPress={()=>{sound.play()}}>i will never implement account functionality</Button>
    </div>
  )
}