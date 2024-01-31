import { Link } from "react-router-dom";
import {Button, Label, TextInput} from "flowbite-react"

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left-side */}
        <div className="flex-1">
          <Link
        to="/"
        className="font-bold dark:text-white text-4xl"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-orange-400 to-rose-700 rounded-lg text-white">
          BLOGGIE
        </span>
          </Link>
          <p className="text-sm mt-5">
            Itskillz Capstone Project. Sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right-side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Enter Username" id="username"/>
              <input/>
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="text" placeholder="Enter Email" id="email"/>
              <input/>
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="text" placeholder="Enter Password" id="password"/>
              <input/>
            </div>
            <Button gradientDuoTone="pinkToOrange" type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
