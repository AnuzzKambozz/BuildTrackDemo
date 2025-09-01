'use client';

import { useState } from 'react';
import Image from "next/image";
import AppIcon from "@/app/public/app-icon.svg";
import BackArrowImage from "../public/forgot-password-back-arrow.svg";
import {inter} from '@/app/fonts'
import InputField from '../components/textField';
import { AuthPageProps } from '../models/common';
import { AuthPageType } from '../utility/app-enum';




export default function ForgotPasswordPage({onPageTypeChange}: AuthPageProps) {

  const [email, setEmail] = useState('');



    return (
      <div className={`${inter.className} antialiased flex flex-col justify-center content-center w-full h-full absolute`}> 
        <div className='flex flex-row justify-center content-center'>
        <Image src={AppIcon} alt="info" width={160} height={40} className="center"/>
         {/* <div className='text-[#060606] text-[27px] font-bold'>Build Track</div> */}
        </div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative'>
         <div className='text-[#060606] text-[27px] font-bold text-center'>Forgot Your Password ?</div>
         <div className='text-[#7E7E7E] text-[15px] font-medium text-center'>Enter your email address, and we’ll send you a link to 
         <br /> reset your password.</div>
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
        </div>
        <div className='h-7'></div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative pl-[108px] pr-[108px] gap-5'>
          <button
                type="button"
                className={`${inter.className} antialiased font-semibold text-[16px] h-[48px] text-white bg-primaryColor rounded-md`}
              >
                Send Reset Link 
          </button>
        </div>
        <div className='h-11'></div>
        <div className='flex flex-row justify-center content-center relative pl-[108px] pr-[108px] gap-1'>
        <Image src={BackArrowImage} alt="info" width={20} height={20} className="center"/>
          <button
                  type="submit"
                  className={`${inter.className} antialiased font-medium text-[15px] text-primaryColor`}
                  onClick={() => onPageTypeChange(AuthPageType.LOGIN) }
                >
                  Back to Login 
            </button>
        </div>
      </div>
    );
 }