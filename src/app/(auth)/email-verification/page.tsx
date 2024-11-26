'use client'
import { getVerificationTokenByToken } from '@/actions/verificationToken/getVerificationTokenBy';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState} from 'react';
import CardAuthWrapper from '@/components/client_component/CardAuthWrapper';
import FormError from '@/components/client_component/FormError'
import FormSuccess from '@/components/client_component/FormSuccess'
import { emailVerification } from '@/actions/verificationToken/emailVerification';
import {PuffLoader} from 'react-spinners'

const EmailVerification = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(()=>{
        const getVerificationToken = async () =>{            
            try{
                setErrorMsg('');
                setSuccessMsg('');
                if(token){
                    console.log('tokenid in string', token)
                    const verificationToken = await getVerificationTokenByToken(token);
                    console.log('verification Token got from link token', verificationToken)
                    if(!verificationToken){
                        setErrorMsg('Token does not exist');
                        return                      
                    }
                    const isEmailVerified = await emailVerification(verificationToken);
                    if(!isEmailVerified){
                        setErrorMsg('Email verifiaction failed - front');
                        return
                        // throw new Error ('Error verifying the email')
                    }
                    if('message' in isEmailVerified){
                        setSuccessMsg(isEmailVerified?.message);
                    }  else {
                        setErrorMsg(isEmailVerified?.error);
                    }
                } else {
                    setErrorMsg('Token not found');
                    // alert('Token not found')
                }
                
            }catch(error){
                console.log('Error verifying the email', error);
                setErrorMsg('Error verifying the email');
                alert(error)
            }
        }
        getVerificationToken();
    },[token])


    
    
  return (
    <div>
        <CardAuthWrapper Headlabel='Email verification' href='emailVerification' message=''>
            {!successMsg && !errorMsg && (
                <div className='text-right  flex justify-center'>
                    {/* <CircleLoader
                        color="#17d97e"
                        speedMultiplier={1}
                    /> */}
                    <PuffLoader color="#25b053" />
                </div>                
            )}
            <FormError message={errorMsg} />
            <FormSuccess message={successMsg} />
        </CardAuthWrapper>        
    </div>
  )
}

export default EmailVerification