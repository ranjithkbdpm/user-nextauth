"use client"
import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {FcGoogle} from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

interface CardAuthWrapperProps {
    children: React.ReactNode,
    Headlabel?:string
    href:string,
    message?:string,
    showSocial?:boolean

} 

const CardAuthWrapper = (
    {
        children,
        Headlabel,
        href,
        message,
        showSocial,
    }: CardAuthWrapperProps
) => {
  return (
    <div className='w-[400px] shadow-md text-center bg-white rounded p-5'>
        <div>
            <h1 className='text-xl font-bold mt-3'>User Mangement</h1>
            <h3 className='text-lg font-bold mt-3'>{Headlabel}</h3>
        </div>
        <div className="mt-3">{children}</div>
        <div className={`${showSocial ?'flex':'hidden'} w-full mt-3`}>
            <Button className='w-full' variant='outline'>
                <FcGoogle/>
            </Button>
            <Button className='w-full' variant='outline'>
                <FaGithub/>
            </Button>
        </div>
        <div className='mt-3'>
            <Link href={href}>
                {href=='login' ?'Already Have an Account!' :'Create Account'}
            </Link>          
        </div>
        <div>
            {message}
        </div>
    </div>
  )
}

export default CardAuthWrapper