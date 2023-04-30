import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  const body = await request.json();

  try {
    const { location, price, ...listingData } = body;

    const listing = await prisma.listing.create({
      data: {
        ...listingData,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (err) {
    console.error(err);
  }
}
