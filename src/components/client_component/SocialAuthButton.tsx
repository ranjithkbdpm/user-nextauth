import {Button} from '@/components/ui/button';
import {FcGoogle} from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react';
// The signIn function from next-auth/react is intended for client-side use and doesn’t need any special setup beyond handling the asynchronous nature of the function.
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/routes';

const SocialAuthButton = () => {

    const handleSocialAuth = (provider:string) =>{
        signIn(provider, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }    

  return (
    <>
        <Button className='w-full' variant='outline' onClick={()=>handleSocialAuth("google")}>
            <FcGoogle/>
        </Button>
        <Button className='w-full' variant='outline' onClick={()=>handleSocialAuth("github")}>
            <FaGithub/>
        </Button>
    </>
  )
}

export default SocialAuthButton