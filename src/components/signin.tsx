import { signIn } from "@/auth"
import { Button } from '@heroui/react'
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" color="primary">Sign in with Google</Button>
    </form>
  )
} 