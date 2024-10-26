"use server";
import z from "zod";
import { registerSchema } from "../../../schema/formSchemas";
// import {headers} from 'next/headers'
import bcrypt from "bcrypt";
// import bcrypt from 'bcrypt';
import db from "@/lib/db";
import { UserProps } from "@/type/type";
import { getUserByEmail } from "./getUserBy";

export const register = async (
    values: z.infer<typeof registerSchema>
): Promise<
    { message: string; success: boolean; user?: UserProps } | { error: string }
> => {
    // check the validatedValues of the incoming values
    const validatedValues = registerSchema.safeParse(values);
    // console.log(validatedValues.data);
    // check validation
    if (!validatedValues.success) {
        return { success: false, error: "Invalid credentials data" };
    }
    const { firstname, lastname, email, phonenumber } = validatedValues.data;
    // console.log(firstname, lastname, email, phonenumber);
    const existingUser = await getUserByEmail(email)
    // check if the user exist already
    if (existingUser) {
        return { success: false, error: "User already exist" };
    } else {
        const hashedPassword = await bcrypt.hash(values.password, 10);
        const user = await db.user.create({
            data: {
                firstname,
                lastname,
                email,
                phonenumber,
                password: hashedPassword,
            },
        });

        return { success: true, message: "User created successfully", user };
    }
};
