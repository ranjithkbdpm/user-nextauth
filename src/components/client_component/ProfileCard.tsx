import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import defaultProfileImage from '../../../public/image/default-profile-avatar.jpg'

interface ProfileProps {
  children: React.ReactNode,
  name?: string | null | undefined;
  email?: string | null | undefined;
  profileImage?: string | null | undefined;
  role?: string | null | undefined;
  cardStyle?: object;
  imgStyle?: imgDimension;
}

interface imgDimension {
    width: number | undefined ;
    height: number | undefined;
}

const ProfileCard = (props: ProfileProps) => {
  return (
    <>
      <Card style={props.cardStyle} className='text-center'>
        <CardHeader>
          <CardTitle className='text-lg font-bold'>
            <h1>Profile Information</h1>
         </CardTitle>
          <div className='flex justify-center'>
            <Image
                src={props?.profileImage || defaultProfileImage} // set default images in the public directory to resolve Type 'string | null | undefined' is not assignable to type 'string | StaticImport'
                alt="profile Image"
                width={props?.imgStyle?.width} // Desired width of the image
                height={props?.imgStyle?.height} // Desired height of the
                className='rounded-full'
            />
            {/* built-in <Image /> component from next/image to display images. This component provides optimization features like automatic resizing, lazy loading, and responsive support */}
          </div>          
        </CardHeader>
        <CardContent>
          <h1>{props.name}</h1>
          <p>Email: {props.email}</p>
          <p>Role: {props.role}</p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          {props.children}
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileCard;
