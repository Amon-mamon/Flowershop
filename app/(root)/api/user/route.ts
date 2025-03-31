import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z.string().min(1,"Username is required").max(100),
    email: z.string().email("Invalid email format."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(/[\W_]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(8,'Password confirmation is required'),
  })
 
export async function POST (req: Request) {
    try {
        const body = await req.json()
        const {email , username, password,} = schema.parse(body);

        // check email if already existing
        const existingUserByEmail = await prisma.user.findUnique({
            where:{ email: email}
        })
            if(existingUserByEmail){
                return NextResponse.json({user:null, message: "Email already exists"}, {status: 409})
            }
            
        const existingUserName = await prisma.user.findUnique({
            where:{ username: username}
        })
            if(existingUserName){
                return NextResponse.json({user:null, message: "Username already exists"}, {status: 409})
            }
        const hashPassword =  await hash(password, 10);
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashPassword,
            }
        })
        const { password: newUserPassword } =newUser;
            return NextResponse .json({user:newUserPassword, message: "created successfully"}, {status: 201})
    }catch(error) {
        console.error("Error:", error); // Log the actual error
        return NextResponse .json({message: "Something went wrong"}, {status: 500})
    }
}