'use client';
import { useEffect } from 'react';
// import AuthPage from "./auth/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const islogin = localStorage.getItem('isLogin');
    if(islogin === 'true'){
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  },[router]);

  return (
    <div className="flex flex-row justify-evenly w-full h-full absolute"></div>
  );
}
