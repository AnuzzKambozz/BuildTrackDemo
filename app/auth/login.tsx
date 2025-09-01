'use client';

import {useState } from 'react';
import Image from "next/image";
import AppIcon from "@/app/public/app-icon.svg";
import {inter} from '@/app/fonts'
import InputField from '../components/textField';
import { AuthPageProps } from '../models/common';
import { AuthPageType } from '../utility/app-enum';

import { useRouter } from "next/navigation";



export default function LoginPage({onPageTypeChange}: AuthPageProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();








    return (
      <div className={`${inter.className} antialiased flex flex-col justify-center content-center w-full h-full absolute`}> 
        <div className='flex flex-row justify-center content-center'>
        <Image src={AppIcon} alt="info" width={160} height={40} className="center"/>
         {/* <div className='text-[#060606] text-[27px] font-bold'>Build Track</div> */}
        </div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative'>
         <div className='text-[#060606] text-[27px] font-bold text-center'>Welcome Back</div>
         <div className='text-[#7E7E7E] text-[15px] font-medium text-center'>Manage your project with ease</div>
        </div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative pl-[108px] pr-[108px] gap-5'>
            <InputField
                      name=""
                      label="Email Id"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      placeholder="Enter Email Id"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
          <InputField
                      name=""
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      placeholder="Enter Password"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
        </div>
        <div className='h-7'></div>
        <div className='flex flex-row justify-end content-end relative pl-[108px] pr-[108px] gap-5'>
          <button
                  type="button"
                  className={`${inter.className} antialiased font-semibold text-[16px] h-[48px] text-primaryColor`}
                  onClick={() => onPageTypeChange(AuthPageType.FORGOT_PASSWORD) }
                >
                  Forgot Password?
            </button>
        </div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative pl-[108px] pr-[108px] gap-5'>
          <button
                type="button"
                className={`${inter.className} antialiased font-semibold text-[16px] h-[48px] text-white bg-primaryColor rounded-md`}
                onClick={() => {
                  // Perform login logic here 
                  console.log("Login clicked");
                  localStorage.setItem("isLogin", 'true')
                  router.push(`/dashboard`);
                }  

                }
               

              >
                Login
          </button>
        </div>
        <div className='h-11'></div>
        <div className='flex flex-row justify-center content-center relative pl-[108px] pr-[108px] gap-1'>
         <div className='text-[#7E7E7E] text-[15px] font-medium text-center'>Don’t have an account ?</div>
          <button
                  type="submit"
                  className={`${inter.className} antialiased font-medium text-[15px] text-primaryColor`}
                  onClick={() => onPageTypeChange(AuthPageType.SIGN_UP) }
                >
                  Sign Up
            </button>
        </div>
      </div>
    );
 }