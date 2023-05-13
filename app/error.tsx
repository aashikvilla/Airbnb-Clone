'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorstateProps{
    error : Error
}


const ErrorState=({error}:ErrorstateProps)=>{

    useEffect(()=>{
        console.error(error);
    },[error])


    return (
        <EmptyState title="Uh oh" subTitle="Something went wrong!"/>
    )

}


export default ErrorState;