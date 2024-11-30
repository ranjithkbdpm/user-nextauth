'use server'
import db from '@/lib/db'
import {v4 as uuidv4} from 'uuid' 
import { getResetPasswordTokenByEmail } from './getResetPasswordToken';

export const generateResetPasswordToken = async(email: string) =>{
    const token = uuidv4();

    const expires = new Date(new Date().getTime() +  60*60*1000);

    const existingToken = await getResetPasswordTokenByEmail(email);
    // await the existing token before deleteing the token by its id
    console.log('token reset',existingToken)
    if(existingToken){
        await db.resetPasswordToken.delete({
            where:{id:existingToken.id}
        })
    }

    const resetPasswordToken = db.resetPasswordToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return resetPasswordToken;


}