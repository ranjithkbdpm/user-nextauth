'use server'
import db from '@/lib/db'


export const getUserByEmail = async(email: string) => {
    // get user with email 
    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        return user

    } catch (error) {
        console.log('getUserByEmail:', error)
        return 
    }
    
}

export const getUserById = async(id: string) => {
    // get user with email 
    try {
        const user = await db.user.findUnique({
            where: { id },
        });

        return user

    } catch (error) {
        console.log('getUserById:', error)
        return 
    }
    
}