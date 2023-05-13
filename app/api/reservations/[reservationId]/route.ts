import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams{
    reservationId?:string
}

export async function DELETE(request: Request, {params}:{params : IParams}) {

  const currentUser =await getCurrentUser();

  if(!currentUser){
     return NextResponse.error();
  }
  const {reservationId} = params

  if(!reservationId || typeof reservationId !== 'string'){
    return NextResponse.error();
 }


  try {
   
    const reservation =await prisma.reservation.deleteMany({
      where:{
        id:reservationId,
        OR:[
            {userId : currentUser.id},
            {listing:{userId : currentUser.id}}
        ]
      }

    
    });

    return NextResponse.json(reservation);
  } 
  catch (err) {
    console.error(err);
  }
}
