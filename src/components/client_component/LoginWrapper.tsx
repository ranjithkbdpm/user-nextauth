"use client"
import React from 'react'
import {useRouter} from 'next/navigation'

interface LoginWrapperProps {
    children: React.ReactNode,
    mode?: 'modal' | 'redirect',
    asChild?: boolean,
    className?: string
}

const LoginWrapper = (
    {
        children,
        mode = 'redirect',
        // asChild,
        className,

    }: LoginWrapperProps
) => {
    
    const router = useRouter();

    if (mode == "modal") {
        return (
            <span>Modal box rendered</span>
        )
    }
        
    const handleClick = () => {
        console.log('login clicked')
        router.push('/login')
    }

    return (
        <span onClick={handleClick} className={className}>
            {children}
        </span>
    )
}

export default LoginWrapper