import {Button} from 'flowbite-react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { FaGoogle } from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleGoogleClick = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      const {
        displayName: name,
        email,
        photoURL: googlePhotoUrl
      } = resultsFromGoogle.user

      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          googlePhotoUrl
        })
      })

      const data = await res.json()

        if (data.success === false) {
        return dispatch(signInFailure(data.message))
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <FaGoogle className='w-6 h-6 mr-2'/>
      Continue with Google
    </Button>
  )
}
