import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useMemo } from "react";


interface IUseFavorites{
    listingId: string,
    currentUser?: SafeUser| null
}


const useFavorite =({ listingId, currentUser}:IUseFavorites)=>{
    const router=useRouter();
    const loginModal =useLoginModal();
    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId);

    },[currentUser, listingId])

    const toggleFavorite = useCallback( async (e:React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();

        if(!currentUser){
            loginModal.onOpen();
        }

        try{
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`);
            }
            else{
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success')

        }
        catch(error){
            console.log('error in toggleFavorite', error)
            toast.error('Something went wrong.'+ error)
        }

    },[currentUser, listingId,hasFavorited,loginModal,router])


    return {
        hasFavorited, toggleFavorite,
    }

}

export default useFavorite;