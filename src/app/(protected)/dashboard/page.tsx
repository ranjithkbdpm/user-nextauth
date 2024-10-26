import React from 'react'
import {auth, signOut} from '../../../../auth'

const dashboard = async () => {

    const session = await auth()
    // console.log('session',session)

  return (
    <>
        {session 
           ?<div>
              <p>Dashboard</p>
              <p>{JSON.stringify(session)}</p>
              <form action={async()=>{
                  "use server"
                  await signOut();
                }}>
                <button type='submit' >sign out</button>
              </form>
              
            </div> 
           :<h1>You are not authorised to view this page</h1>
        }

        {/* <div>Dashboard</div> */}
    </>
    
  )
}

export default dashboard



// The difference in behavior between the two versions of the dashboard component comes down to the way the sign-out action is triggered:

// In the first code snippet, the sign-out action is inside a <form> element, and the action attribute of the form is set to an asynchronous function that performs the sign-out. When the form is submitted, it follows the server-action workflow, which is compatible with Next.js server actions (assuming auth and signOut are Next.js-specific).

// In the second code snippet, the onClick event on the <button> directly calls the asynchronous signOut function. However, because "use server" is used in the onClick handler, it’s meant for server actions that are not supported directly on client-side events like onClick.

// In Next.js, server actions are typically only available in special contexts like form action handlers, where they operate within the server environment. Directly assigning a server action to a client-side onClick will not work as expected because onClick is a client-side event, and "use server" doesn’t apply in that context.