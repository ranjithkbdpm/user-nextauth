import CardAuthWrapper from '@/components/client_component/CardAuthWrapper'
import React from 'react'
import LoginForm from '@/app/_screens/Login/LoginForm'

const login = () => {
  return (
    <CardAuthWrapper Headlabel='Login' href='register' message='' showSocial>
        <LoginForm/>
    </CardAuthWrapper>
  )
}

export default login