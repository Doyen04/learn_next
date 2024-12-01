import { prisma } from "@/lib/prisma";


export async function POST(req: Response){
    try {
        const data = await req.json();
        const { email, token } = data;
        
        const verAcc = await prisma.verificationToken.findUnique({
            where: {
                identifier_token:{
                    token: token,
                    identifier: email,
                }
            }
        })
        //12 2|0 21
        console.log(email, token == verAcc?.token);
        if (!verAcc || verAcc.expires < new Date(Date.now())) {
            return Response.json({message: "time out"},{status: 401})
        }
        
        if(token != verAcc.token){
            return Response.json({message: "Invalid token"},{status: 401})
        }else{
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            if(!user){
                return Response.json({message: "User not found"},{status: 404})
            }
            await prisma.verificationToken.delete({
                where: {
                    identifier_token:{
                        token: token,
                        identifier: email,
                    }
                }
            })
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    emailVerified: true,
                }
            })
            return Response.json({message: "Email Verified"},{status: 201})
        }
        
    } catch (error) {
        console.log("error", error);
    }
    
}