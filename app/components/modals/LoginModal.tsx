"use client";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useRouter} from 'next/navigation'



function LoginModal() {
  const router= useRouter();
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {     
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data",data)
    setLoading(true);

    signIn('credentials',{
      ...data,
      redirect:false
    })
    .then((callback) =>{
      console.log("call",callback)
      setLoading(false);

      if(callback?.ok){
        toast.success('Logged In');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error)
      }
    })

   
  };

  const toggle=useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal,registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
        type="email"
      />

    

      <Input
        id="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className=" flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {signIn('google')}}
      />

      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => {signIn('github')}}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
