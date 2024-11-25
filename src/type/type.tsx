// types


// user interface

export interface UserProps {
    firstname: string | null;
    lastname: string | null;
    email: string;
    phonenumber: string | null;
    password: string | null;
    role: string | null;
}

export interface VerificationToken {
  id: string;    
  email : string ;   
  token : string;
  expires : Date;
}

