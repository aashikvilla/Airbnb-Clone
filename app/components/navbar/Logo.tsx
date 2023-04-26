"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return (
    <Image
      className="hidden md:block cursor-pointer"
      onClick={() => router.push("/")}
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
}

export default Logo;
