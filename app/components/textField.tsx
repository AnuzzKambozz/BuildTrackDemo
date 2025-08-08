"use client";

import React, { useState } from "react";
import { inter } from "@/app/fonts";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label?: string;
  type?: string;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  highlight?: boolean;
  min?: string;
  max?: string;
  mandatory?: boolean;
  error?: string; // 👈 add error prop
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled = false,
  className = "",
  labelClassName = "",
  highlight = false,
  min,
  max,
  mandatory = false,
  error, // 👈 receive error prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`relative flex flex-col w-full ${inter.className}`}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-[#7E7E7E] text-[16px] font-medium leading-tight pl-[10px]",
            labelClassName
          )}
        >
          {label}{" "}
          {mandatory && (
            <span className="text-asteriskColor text-[14px]">*</span>
          )}
        </label>
      )}
      <div className="h-3" />

      <div className="relative">
        <input
          min={type === "date" ? min : undefined}
          max={type === "date" ? max : undefined}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            inter.className,
            "w-full border p-3 rounded text-base font-medium leading-normal h-12 placeholder:normal pr-10 focus:outline-none",
            error
              ? "border-red-500 focus:border-red-500"
              : "focus:border-primaryColor",
            className,
            highlight ? "border-highLightInputColor" : ""
          )}
        />
        {isPassword && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
