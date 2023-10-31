import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { User } from "@prisma/client";
import { UserRepository } from "@/app/_repositories/User";

export async function GET(request: NextRequest) {
  try {
    const users = await UserRepository.findMany();
    return NextResponse.json(users);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    const createdUser = await UserRepository.create(user);
    // const createdUser = await prisma.user.create({
    //   data: {
    //     ...user,
    //   },
    // });
    console.log(createdUser);
    return NextResponse.json(createdUser);
    //return NextResponse.json({ createdUser }, { status: 201 });
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
