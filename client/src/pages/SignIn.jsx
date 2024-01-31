import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';

export default function SignIn() {
    const initialFormState = {
    email: "",
    password: "",
  }
  
  const [formData, setFormData] = useState(initialFormState)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const { loading, error: errorMessage } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value.trim() }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.email || !formData.password) {
    //   return dispatch(signInFailure('Please fill all the fields'));
    // }
    // try {
    //   dispatch(signInStart());
    //   const res = await fetch('/api/auth/signin', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   if (data.success === false) {
    //     dispatch(signInFailure(data.message));
    //   }

    //   if (res.ok) {
    //     dispatch(signInSuccess(data));
    //     navigate('/');
    //   }
    // } catch (error) {
    //   dispatch(signInFailure(error.message));
    // }
    if (!formData.email || !formData.password) {
      return setErrorMessage("Missing field(s)")
    }
    try {
      setIsLoading(true)
      setErrorMessage(null)
      const res = await fetch('api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setIsLoading(false)
      setFormData(initialFormState)
      if (data) {
        navigate('/sign-in')
      }
    } catch ({message}) {
      setIsLoading(false)
      setErrorMessage(message);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left-side */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-orange-400 to-rose-700 rounded-lg text-white">
          BLOGGIE
        </span>
          </Link>
          <p className='text-sm mt-5'>
            Itskillz Capstone Project. Sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right-side */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
                onChange={handleChange}
                value={formData.email}
                type='email'
                placeholder='Enter Email'
                id='email'
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput
                onChange={handleChange}
                value={formData.password}
                type='password'
                placeholder='Enter Password'
                id='password'
              />
            </div>
            <Button
              gradientDuoTone='pinkToOrange'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}