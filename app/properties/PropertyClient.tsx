'use client'

import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertyClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

function PropertyClient({
  listings,
  currentUser
}: PropertyClientProps) {


  const router = useRouter();

const [deletingId, setDeleteingId] = useState("");

const onCancel = useCallback(
  (id:string) => {
    setDeleteingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(()=>{
        toast.success('Listing Deleted');
        router.refresh();
    })
    .catch((error)=>{
        toast.error(error?.response?.data?.error);
    })
    .finally(()=>{
        setDeleteingId('');
    })
  }, [router])


  return (
    <Container>
      <Heading
        title="Properties"
        subTitle="Your properties"
      />
      <div
        className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}          
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertyClient;
