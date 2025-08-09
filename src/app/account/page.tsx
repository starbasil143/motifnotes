
import SignIn from '@/components/signin';
import { Button } from "@heroui/react";
import { Howl, Howler } from 'howler';
import { auth } from "@/auth"

export default async function AccountPage() {

  const session = await auth();

  const sound = new Howl({
    src: ['win31.mp3']
  })

  return (
    <div className='min-h-100 min-w-full flex justify-center align-middle items-center'>
      <SignIn></SignIn>
      {session?(
        <p>true also you are {session.user?.name?.split(' ')[0]}</p>
      ):(
        <p>fake</p>
      )}
    </div>
  )
}