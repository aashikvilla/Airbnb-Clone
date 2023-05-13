import { getCurrentUser } from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertyClient from "./PropertyClient";



const PropertyPage= async()=> {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subTitle='Please Login'/>
            </ClientOnly>
        )
    }

    const listings = await getListings({userId: currentUser.id})
    if(listings.length ===0){
        return (
            <ClientOnly>
                <EmptyState title='No properties found' subTitle='Looks like you have no properties'/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <PropertyClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  )
}

export default PropertyPage