import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt";
declare interface JWTCallbackParams {
    token: JWT;
    user?: User;
}

declare interface SessionCallbackParams {
    session: Session;
    token: JWT;
}

// data
interface FlowerItems {
    id: string; 
    image: StaticImageData;
    title: string;
    price: string;
}

// Modal send code
interface SendCodeProps {
  email: string;
  closeVerification: (value: boolean) => void;
  onVerified: () => void;
}

//hero service
interface Highlights {
    icon:React.ReactNode;
    title:string;
    description:string;
  }