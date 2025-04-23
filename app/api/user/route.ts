import { NextRequest} from "next/server";
import { getAllUsers, registerUser } from "../../../lib/controllers/usercontroller/userController";

export async function GET() {
  return getAllUsers();
}

export async function POST(req: NextRequest) {
  return registerUser(req);
}
