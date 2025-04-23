import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { registerSchema } from "@/lib/validators/schema";
import { createUser, findUserByEmail, findUserByUsername, getUsers } from "../../models/usermodel/userModel";
import { hashPassword } from "@/lib/utils/hash/hashPassword";

export async function getAllUsers() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function registerUser(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = registerSchema.parse(body);

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return NextResponse.json({ user: null, message: "Username already exists" }, { status: 409 });
    }
    
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({ email, username, password: hashedPassword });

    return NextResponse.json({ user: newUser, message: "Created successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    console.error("Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
