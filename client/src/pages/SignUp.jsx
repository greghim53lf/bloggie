import { Link, useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { useState } from "react";
import OAuth from '../components/OAuth';

export default function SignUp() {
  const initialFormState = {
    username: "",
    email: "",
    password: "",
  }
  
  const [formData, setFormData] = useState(initialFormState)

  const [errorMessage, setErrorMessage] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value.trim() }))
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return setErrorMessage("Missing field(s)")
    }

    try {
      setIsLoading(true)
      setErrorMessage(null)

      const res = await fetch('api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      setIsLoading(false)
      setFormData(initialFormState)

      if (data.success === false) {
        return setErrorMessage(data.message)
      }


      if (res.ok) {
        navigate('/sign-in')
      }
      
    } catch ({message}) {
      setErrorMessage(message);
      setIsLoading(false)
    }
  }
  
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
            Bloggie with friends. Sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right-side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput onChange={handleChange} value={formData.username} type="text" placeholder="Enter Username" id="username"/>
            </div>
            <div>
              <Label value="Email" />
              <TextInput onChange={handleChange} value={formData.email} type="email" placeholder="Enter Email" id="email"/>
            </div>
            <div>
              <Label value="Password" />
              <TextInput onChange={handleChange} value={formData.password} type="password" placeholder="Enter Password" id="password"/>
            </div>
            <Button gradientDuoTone="pinkToOrange" type="submit" disabled={isLoading}>
              {isLoading ? <>
              <Spinner size='sm'/><span className="pl-3">Loading...</span>
              </> : 'Sign Up'}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">Sign In</Link>
          </div>
          {errorMessage && <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>}
        </div>
      </div>
    </div>
  )
}