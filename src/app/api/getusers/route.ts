import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextAuthOp } from "../../../../lib/authoption";

export async function GET(){
    const session = await getServerSession(NextAuthOp)
    if (!session){
        return NextResponse.json({error:"not authorized"},{status:404})
    }
    return NextResponse.json({success:session},{status:400})
}