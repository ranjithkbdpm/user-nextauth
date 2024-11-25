
import {auth, signOut} from '../../../../auth';
import ProfileCard from '@/components/client_component/ProfileCard';
import { Button } from "@/components/ui/button"

const dashboard = async () => {

    const session = await auth();

    const user = {
      name: session?.user?.name,
      email: session?.user?.email,
      role: session?.user?.role,
      profileImage : session?.user?.image
    }
   const cardStyle = {
    width:"300px",
    height:"400px"
   }

   const imgStyle = {
    width:100,
    height:100
   }
    
    // console.log('session',session)

  return (
    <div className="h-[100vh] flex justify-center items-center">
        {session 
           ?<div className=" flex justify-center p-5">
              <div className="mr-5">
                <ProfileCard name = {user.name} email = {user.email}  profileImage = {user.profileImage}  role = {user.role} cardStyle={cardStyle} imgStyle = {imgStyle}>
                  <form action={async()=>{
                    "use server"                                   
                      await signOut({
                          redirect: true,
                          redirectTo: '/login',
                          // callbackUrl: '/login',
                      });                  
                    }}>
                    <Button type='submit'>sign out</Button>
                  </form>
                </ProfileCard>
              </div>
              <p>{JSON.stringify(session)}</p>             
            </div> 
           :<h1>You are not authorised to view this page</h1>
        }
    </div> 
  )
}

export default dashboard


{/* //useful for tasks that require server-side execution, such as clearing server-side sessions or performing sensitive operations without exposing them to the client. */}


// The difference in behavior between the two versions of the dashboard component comes down to the way the sign-out action is triggered:

// In the first code snippet, the sign-out action is inside a <form> element, and the action attribute of the form is set to an asynchronous function that performs the sign-out. When the form is submitted, it follows the server-action workflow, which is compatible with Next.js server actions (assuming auth and signOut are Next.js-specific).

// In the second code snippet, the onClick event on the <button> directly calls the asynchronous signOut function. However, because "use server" is used in the onClick handler, it’s meant for server actions that are not supported directly on client-side events like onClick.

// In Next.js, server actions are typically only available in special contexts like form action handlers, where they operate within the server environment. Directly assigning a server action to a client-side onClick will not work as expected because onClick is a client-side event, and "use server" doesn’t apply in that context.