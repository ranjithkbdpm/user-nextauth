'use client'
import React from 'react'
import CardAuthWrapper from '@/components/client_component/CardAuthWrapper'
import NewPasswordForm from '@/app/_screens/New-password/New-Password';

const NewPassword = () => {
  return (
    <CardAuthWrapper Headlabel='Enter New Password'  href='emailVerification'  message=''>
       <NewPasswordForm/>     
    </CardAuthWrapper>
  )
}

export default NewPassword