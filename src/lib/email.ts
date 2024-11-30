import {Resend} from 'resend';


const resend =  new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) =>{

    const confirmationLink = `http://localhost:3000/email-verification?token=${token}`;

    return await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Hello world',
        // react: EmailTemplate({ firstName: 'John' }),
        html: `<p> Click <a href=${confirmationLink}">here</a> to confirm the email ${confirmationLink} </p>`
      });

    //   if (error) {
    //     return { message: 'Verification Email failed', success: true };
    //   }
      
    //   if(data){
    //     return { message: 'Verification Email sent', success: true };
    //   }      

}   

export const sendresetPasswordEmail = async (email: string, token: string) =>{

  const confirmationLink = `http://localhost:3000/new-password?token=${token}`;

  return await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world',
      // react: EmailTemplate({ firstName: 'John' }),
      html: `<p> Click <a href=${confirmationLink}">here</a> to create new password ${confirmationLink} </p>`
    });    

} 