import React from 'react'
import {auth, signOut} from '../../../../auth'

const Dashboard2 = async () => {

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

export default Dashboard2

