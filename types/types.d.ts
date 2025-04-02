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