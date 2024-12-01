'use server'
// import {v4 as uuidv4} from 'uuid';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from './getTwoFactorTokenBy';
import db from '@/lib/db'

export const generateTwoFactorToken = async(email:string) => {
    // create verification token (token, expiriration time, email)
    const token = crypto.randomInt(100_000, 1_000_000).toString()
    // const token = uuidv4();
    // set expiration time to 1hr. take current time in millisecond and add 3600sec in milliseconds 
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
       await db.twoFactorToken.delete({
            where:{id:existingToken.id}
        })
    };
   
    const generateTwoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return generateTwoFactorToken;
}

