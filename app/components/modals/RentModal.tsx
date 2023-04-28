"use client";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { useCallback, useMemo, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useRouter} from 'next/navigation'
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
//import Map from "../Map";
import dynamic from "next/dynamic";

enum STEPS{
  CATEGORY=0,
  LOCATION=1,
  INFO=2,
  IMAGES=3,
  DESCRIPTION=4,
  PRICE=5
}

function RentModal() {
  const router= useRouter();

  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack=()=>{
    setStep((value)=>value-1);
  }

  const onNext=()=>{
    setStep((value)=>value+1);
  }

  const actionLabel=useMemo(()=>{
    if(step === STEPS.PRICE){
      return 'Create'
    }
    else return 'Next'

  },[step])

  const secondaryActionLabel=useMemo(()=>{
    if(step === STEPS.CATEGORY){
      return undefined
    }
    else return 'Back'

  },[step])


  const {
    register,
    handleSubmit,setValue,watch,
    formState: { errors }, reset
  } = useForm<FieldValues>({
    defaultValues: {     
     category:"",
     location:null,
     guestCount:1,
     roomCount:1,
     bathroomCount:1,
     imageSrc:'',
     price:1,
     title:'',
     description:''
    },
  }); 

  const category=watch('category');
  const location=watch('location');
  const Map =useMemo(()=> dynamic(()=> import('../Map'),{ssr:false}),[location])

  const setCustomValue =(id:string, value:any)=>{
    setValue(id,value,{
      shouldDirty:true,
      shouldTouch:true,
      shouldValidate:true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data",data)
   // setLoading(true);

    signIn('credentials',{
      ...data,
      redirect:false
    })
    .then((callback) =>{
      console.log("call",callback)
     // setLoading(false);

      if(callback?.ok){
        toast.success('Logged In');
        router.refresh();
        rentModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error)
      }
    })

   
  };


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describe your place" subTitle="Pick a category" />
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {
          categories.map(item=>(
            <div key ={item.label} className='col-span-1'>
             
              <CategoryInput 
              onClick={(category)=>{ setCustomValue('category',category)}}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
              />

            </div>

          ))
        }
      </div>
   
   
    </div>
  );

 if(step ==STEPS.LOCATION){
  bodyContent=(
    <div className="flex flex-col gap-4">
       <Heading title="Where is your place located" subTitle="Help guest find you!" />
       <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}/>
       <Map center={location?.latlng}/>
    </div>
  )
 }

  return (
    <Modal
     // disabled={loading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={bodyContent}
      //footer={footerContent}
    />
  );
}

export default RentModal;
