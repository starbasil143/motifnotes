import SignIn from '@/components/signin';
import { Button } from "@heroui/react";
import { Howl, Howler } from 'howler';
import { auth } from "@/auth"
import { redirect } from 'next/navigation';

export default async function SignInPage() {

  const session = await auth();
  if (session) {
    redirect(`/account`)
  }

  const sound = new Howl({
    src: ['win31.mp3']
  })

  return (
    <div className='min-h-100 min-w-full flex justify-center align-middle items-center'>
      
      {session?(
        <p>How did you get here</p>
      ):(
        <SignIn></SignIn>
      )}
    </div>
  )
}