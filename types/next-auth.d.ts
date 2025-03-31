import{ DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}
