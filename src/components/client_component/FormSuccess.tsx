import React from 'react'
import { CiWarning } from "react-icons/ci";

interface formSuccessProps {
    message?:string
}

const FormSuccess = ({message}:formSuccessProps) => {
  if(!message) return null
  return (
    <div className='flex bg-green-100 rounded p-3 gap-3 items-center'>
      <CiWarning className='text-green-600'/>
      <p className='text-green-600'>{message}</p>
    </div>
  )
}

export default FormSuccess