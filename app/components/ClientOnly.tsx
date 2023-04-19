'use client'
import { useEffect, useState } from "react"

interface ClientOnlyProps{
    children : React.ReactNode
}


function ClientOnly({children}: ClientOnlyProps) {
    const [hasMounted,setHasMounted]= useState(false);

    useEffect(()=>{
        setHasMounted(true);

    },[])
  return (
    hasMounted ? <>{children} </>  :  null 
  )
}

export default ClientOnly