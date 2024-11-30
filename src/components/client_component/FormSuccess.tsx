import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

interface formSuccessProps {
    message?:string
}

const FormSuccess = ({message}:formSuccessProps) => {
  if(!message) return null
  return (
    <div className='flex bg-green-100 rounded p-3 gap-3 items-center'>
      <FaCheckCircle className='text-green-600 text-xs'/>
      <p className='text-green-600 text-xs'>{message}</p>
    </div>
  )
}

export default FormSuccess