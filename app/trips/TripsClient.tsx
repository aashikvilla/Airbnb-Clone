'use client'
import { SafeReservation, SafeUser } from "../types"
import Heading from "../components/Heading"
import Container from "../components/Container"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps{
    reservations : SafeReservation[],
    currentUser : SafeUser | null
}

function TripsClient({reservations, currentUser}:TripsClientProps) {
const router = useRouter();

const [deletingId, setDeleteingId] = useState("");

const onCancel = useCallback(
  (id:string) => {
    setDeleteingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(()=>{
        toast.success('Reservation Cancelled');
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
        <Heading title="Trips" subTitle="Where you've been and where you're going"/>
        <div 
        
        className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5 2xl:grid-cols-6 gap-8">

        {
            reservations.map((reservation)=>(
                <ListingCard 
                key={reservation.id}
                data = {reservation.listing}
                actionId={reservation.id}
                onAction={onCancel}
                disabled ={ deletingId === reservation.id}
                actionLabel="Cancel Reservation"
                currentUser={currentUser}
                reservation={reservation}

                />

            ))
        }
         </div>
    </Container>
  )
}

export default TripsClient