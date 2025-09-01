"use client";

import React from "react";
import { inter } from "@/app/fonts";
import clsx from "clsx";

interface TextAreaFieldProps {
  label?: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  highlight?: boolean;
  mandatory?: boolean;
  error?: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
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
  mandatory = false,
  error,
  rows = 4,
}) => {
  return (
    <div className={`relative flex flex-col w-full ${inter.className}`}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-[#7E7E7E] text-[14px] font-medium leading-tight pl-[10px]",
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(
          inter.className,
          "w-full border p-3 rounded text-[14px] font-medium leading-normal placeholder:normal focus:outline-none resize-none",
          error
            ? "border-red-500 focus:border-red-500"
            : "focus:border-primaryColor",
          className,
          highlight ? "border-highLightInputColor" : ""
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaField;
