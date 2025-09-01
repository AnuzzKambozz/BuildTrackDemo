'use client';

import {useState } from 'react';
import Image from "next/image";
import AppIcon from "@/app/public/app-icon.svg";
import {inter} from '@/app/fonts'
import InputField from '../components/textField';
import { AuthPageProps } from '../models/common';
import { AuthPageType } from '../utility/app-enum';
// import clsx from 'clsx';
import { useRouter } from "next/navigation";


export default function SignUpPage({onPageTypeChange}: AuthPageProps)  {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [userPackage, setUserPackage] = useState(UserPackageType.STARTER);
  const [agreed, setAgreed] = useState(false);

  // const userPackageOptions = [UserPackageType.STARTER, UserPackageType.PRO, UserPackageType.ENTERPRISE];
  const router = useRouter();


    return (
      <div className={`${inter.className} antialiased flex flex-col justify-center content-center w-full min-h-screen absolute overflow-auto`}> 
        <div className='h-[20px]'></div>
        <div className='flex flex-row justify-center content-center'>
         <Image src={AppIcon} alt="info" width={160} height={40} className="center"/>
         {/* <div className='text-[#060606] text-[27px] font-bold'>Build Track</div> */}
        </div>
        <div className='h-9'></div>
        <div className='flex flex-col justify-center content-center relative'>
         <div className='text-[#060606] text-[27px] font-bold text-center'>Create Your Account</div>
        </div>
        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative pl-[108px] pr-[108px] gap-5'>
          <InputField
                      name=""
                      label="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      placeholder="Enter First Name"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
          <InputField
                      name=""
                      label="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      placeholder="Enter Last Name"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
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
          {/* <InputField
                      name=""
                      label="Company Name"
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                      type="text"
                      placeholder="Enter Company Name"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    /> */}
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
          <InputField
                      name=""
                      label="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      type="confirmPassword"
                      placeholder="Enter Password"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
              {/* <div className="w-full relative flex flex-row justify-center items-center gap-5 h-12">
              {userPackageOptions.map((option) => (
                <button
                  key={option}
                  className={clsx(
                    'flex-1 text-center border rounded-md py-2 transition-all text-[16px] font-medium',
                    userPackage === option
                      ? 'bg-[#E0E7FF] text-primaryColor border-primaryColor'
                      : 'bg-white text-[#7E7E7E] border-[#D6D6D6]'
                  )}
                  onClick={() => setUserPackage(option)}
                >
          {option}
        </button>
      ))}
      </div> */}
      <div className='h-0'></div>

      <div className="flex flex-row items-center justify-center space-x-2">
        <input
          id="terms"
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-0 mt-0.5"
        />
        <div className="text-sm text-gray-700">
          <label htmlFor="terms" className="cursor-pointer">
            I agree to{' '}
          </label>
          <span
            onClick={() => console.log("Terms & Conditions clicked")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Terms & Conditions
          </span>{' '}
          and{' '}
          <span
            onClick={() => console.log("Privacy Policy clicked")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Privacy Policy
          </span>
        </div>
      </div>

  </div>




        <div className='h-11'></div>
        <div className='flex flex-col justify-center content-center relative pl-[108px] pr-[108px] gap-5'>
          <button
                type="submit"
                className={`${inter.className} antialiased font-semibold text-[16px] h-[48px] text-white bg-primaryColor rounded-md`}
                onClick={() => {
                  // Perform sign-up logic here 
                  console.log("Sign Up clicked");
                  localStorage.setItem("isLogin", 'true')
                  router.push(`/tenant_onboarding`);
                }}
              >
                Sign Up
          </button>
        </div>
        <div className='h-7'></div>
        <div className='flex flex-row justify-center content-center relative pl-[108px] pr-[108px] gap-1'>
         <div className='text-[#7E7E7E] text-[15px] font-medium text-center'>Already have an account ?</div>
          <button
                  type="button"
                  className={`${inter.className} antialiased font-medium text-[15px] text-primaryColor`}
                  onClick={() => onPageTypeChange(AuthPageType.LOGIN) }
                >
                  Sign In
            </button>
        </div>
        <div className='h-[40px]'></div>
      </div>
    );
 }