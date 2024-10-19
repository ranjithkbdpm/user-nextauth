import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import LoginWrapper from '@/components/client_component/LoginWrapper';


export default function Home() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <h1 className={cn("font-bold text-4xl drop-shadow-lg")}>USER MANAGEMENT TUTORIAL</h1>
        <div className='mt-10 text-center'>
          <LoginWrapper className="cursor-pointer">
            <Link href='/login'>
              <Button>Login</Button>
            </Link>
          </LoginWrapper>
        </div>
      </div>
    </div>
  );
}
