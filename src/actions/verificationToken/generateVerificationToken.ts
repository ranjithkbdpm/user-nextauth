'use server'
import {v4 as uuidv4} from 'uuid'
import { getVerificationTokenByEmail } from './getVerificationTokenBy';
import db from '@/lib/db'

export const generateVerificationToken = async(email:string) => {
    // create verification token (token, expiriration time, email)
    const token = uuidv4();
    // set expiration time to 1hr. take current time in millisecond and add 3600sec in milliseconds 
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
       await db.verificationToken.delete({
            where:{id:existingToken.id}
        })
    };
   
    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return verificationToken;
}

