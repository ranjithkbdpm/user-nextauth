import React from 'react'
import CardAuthWrapper from '@/components/client_component/CardAuthWrapper'
import ResetPassword from '@/app/_screens/Reset-password/ResetPassword'

const page = () => {
  return (
    <div>
        <CardAuthWrapper Headlabel='Forget Password' href='emailVerification' message=''>
            <ResetPassword/>
        </CardAuthWrapper>
    </div>
  )
}

export default page