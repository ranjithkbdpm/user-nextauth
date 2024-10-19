// import z from 'zod'
// import { registerSchema } from '../../../../schema/formSchemas

export async function POST(req: Request) {
    const reqData = await req.json();
    console.log(reqData);
    return new Response(
        JSON.stringify({
            ...reqData,
            message: "Register Data received successfully",
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        }
    );
}
