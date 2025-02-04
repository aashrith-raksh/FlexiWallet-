import { signIn } from "@/lib"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
 
export default function SignIn() {
  return (
    <form
  className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
  action={async (formData) => {
    "use server";
    try {
      const res = await signIn("credentials", formData);
      console.log("\n\tres:", res)
      return redirect("/")
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`api/auth/error?error=${error.type}`);
      }
      throw error;
    }
  }}
>
  <div className="flex flex-col">
    <label htmlFor="phone" className="text-gray-700 font-medium">
      Phone
    </label>
    <input
      name="phone"
      id="phone"
      type="text"
      className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="text-gray-700 font-medium">
      Password
    </label>
    <input
      name="password"
      id="password"
      type="password"
      className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Sign In
  </button>
</form>

  )
}