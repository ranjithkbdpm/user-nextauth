import CardAuthWrapper from '@/components/client_component/CardAuthWrapper'
import RegisterForm from '@/app/_screens/Register/RegisterForm'
import React from 'react'

const register = () => {
  return (
    <CardAuthWrapper Headlabel='Register' href='login' message='' showSocial>
        <RegisterForm />
    </CardAuthWrapper>
  )
}

export default register