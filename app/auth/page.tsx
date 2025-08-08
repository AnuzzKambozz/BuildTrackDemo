'use client';


import Image from "next/image";
import IntroductionBGImage from "@/app/public/lntroduction.svg";
import ForgotPasswordBGImage from "@/app/public/forgot-password.svg";
import LoginPage from "./login";
import SignUpPage from "./sign-up";
import { useState } from 'react';
import { AuthPageType } from "@/app/utility/app-enum";
import ForgotPassword from "./forgot-password";


export default function AuthPage() {
  const [authPageType, setAuthPageType] = useState(AuthPageType.LOGIN);

  return (
    <div className="flex flex-row justify-evenly w-full h-full absolute"> 
      <div className="w-[50%] h-[100%] bg-blue-800 relative content-center"> 
      {(authPageType === AuthPageType.LOGIN || authPageType === AuthPageType.SIGN_UP) &&
        <Image src={IntroductionBGImage} alt="info" width={808} height={602} className="center" quality={100}/>
      }
      {authPageType === AuthPageType.FORGOT_PASSWORD &&
      <div className="flex flex-col justify-center items-center"> 
        <Image src={ForgotPasswordBGImage} alt="info" width={545} height={532} className="center" quality={100}/>
        </div>
      }
      {/* <Image src={GradientBGImage} alt="info" fill  quality={100} priority />  */}
      </div>
      <div className="bg-white w-[50%] h-[100%] flex justify-center relative overflow-auto"> 
        {authPageType === AuthPageType.LOGIN && <LoginPage onPageTypeChange={setAuthPageType} /> }
        {authPageType === AuthPageType.SIGN_UP && <SignUpPage onPageTypeChange={setAuthPageType}/> }
        {authPageType === AuthPageType.FORGOT_PASSWORD && <ForgotPassword onPageTypeChange={setAuthPageType}/> } </div>
    </div>
  );
}
