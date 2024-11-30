import React from 'react'
import { CiWarning } from "react-icons/ci";

interface formErrorProps {
    message?:string
}

const FormError = ({message}:formErrorProps) => {
  if(!message) return null
  return (
    <div className='flex bg-red-100 rounded p-3 gap-3 items-center'>
      <CiWarning className='text-red-600 text-xs'/>
      <p className='text-red-600 text-xs'>{message}</p>
    </div>
  )
}

export default FormError