'use client'

import { Button } from "@/components/ui/button"

const error = ({error, reset}:{
    error:Error, reset: ()=>void
}) => {


  return (
    <>
        <div className="h-[100vh] flex justify-center items-center"> 
            <div>
                {error
                    ?<div>
                        <h1 className="mb-3 text-bold">{error?.name}</h1>
                        <p>{error?.message}</p>
                    </div>
                    :<div>Opps! Something went wrong</div>
                }
                <Button onClick={reset} className="mt-3">Reload</Button>
            </div>             
        </div>
    </>    
  )
}

export default error