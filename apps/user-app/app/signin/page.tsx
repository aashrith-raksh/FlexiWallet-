import { signIn } from "@/lib"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
 
export default function SignIn() {
  return (
    <form
        action={async (formData) => {
          "use server"
          try {
            await signIn("credentials", formData)
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`api/auth/error?error=${error.type}`)
            }
            throw error
          }
        }}
      >
        <label htmlFor="phone">
          Phone
          <input name="phone" id="phone" type="text"/>
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" type="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
  )
}