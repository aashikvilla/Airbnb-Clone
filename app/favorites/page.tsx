import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";


const FavoritePage= async()=> {
    const currentUser = await getCurrentUser();
 

    const favoriteListings = await getFavoriteListings()
    if(favoriteListings.length ===0){
        return (
            <ClientOnly>
                <EmptyState title='No favorites found' subTitle='Looks like you have no favorite listings'/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoriteClient currentUser={currentUser} listings={favoriteListings} />
    </ClientOnly>
  )
}

export default FavoritePage;