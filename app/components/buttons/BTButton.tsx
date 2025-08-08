import React from 'react';
import Image from "next/image";
import { Loader2 } from 'lucide-react';
import {poppins} from '@/app/fonts'

// Type definitions
type ButtonSize = 'small' | 'medium' | 'medium_sm' | 'large';
type ButtonType = 'primary' | 'outline_gray' | 'outline_blue';

interface ButtonProps {
  text?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  size?: ButtonSize;
  className?: string;
  type?: ButtonType;
}

export const BTButton = ({ 
  text = "", 
  icon = "", 
  onClick = () => {}, 
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  size = "medium",
  className = "",
  type = "primary"
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  
  // Size configurations
  const sizeVariants: Record<ButtonSize, {
    padding: string;
    textSize: string;
    iconSize: number;
    gap: string;
  }> = {
    small: {
      padding: "px-3 py-1.5",
      textSize: "text-xs",
      iconSize: 16,
      gap: "gap-1.5"
    },
    medium: {
      padding: "px-4 py-2.5",
      textSize: "text-sm",
      iconSize: 20,
      gap: "gap-2"
    },
    medium_sm: {
      padding: "px-4 py-2",
      textSize: "text-sm",
      iconSize: 20,
      gap: "gap-2"
    },
    large: {
      padding: "px-6 py-3",
      textSize: "text-base",
      iconSize: 24,
      gap: "gap-2.5"
    }
  };

  // Type configurations
  const typeVariants: Record<ButtonType, {
    base: string;
    hover: string;
    active: string;
    text: string;
    border?: string;
    loadingIconColor: string;
  }> = {
    primary: {
      base: "bg-blue-600",
      hover: "hover:bg-blue-700",
      active: "active:bg-blue-800",
      text: "text-white",
      loadingIconColor: "text-white"
    },
    outline_gray: {
      base: "bg-white border-[1px] border-[#C0C0C0]",
      hover: "hover:bg-gray-50 hover:border-gray-400",
      active: "active:bg-[#C0C0C0]",
      text: "text-gray-700",
      border: "border-[1px] border-border-[#C0C0C0]",
      loadingIconColor: "text-gray-700"
    },
    outline_blue: {
      base: "bg-white border-[1.5px] border-blue-600",
      hover: "hover:bg-blue-50 hover:border-blue-700",
      active: "active:bg-blue-100",
      text: "text-blue-600",
      border: "border-2 border-blue-600",
      loadingIconColor: "text-blue-600"
    }
  };
  
  const currentSize = sizeVariants[size];
  const currentType = typeVariants[type];
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center ${currentSize.gap} ${currentSize.padding}
        ${currentType.base} ${currentType.hover} ${currentType.active}
        ${currentType.text} font-medium ${currentSize.textSize}
        rounded-lg shadow-sm
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none 
        ${poppins.className} antialiased
        ${className}
      `}
    >
      {loading ? (
        <Loader2 size={currentSize.iconSize} className={`${currentType.loadingIconColor} animate-spin`} />
      ) : (
        icon && <Image src={icon} alt="info" width={currentSize.iconSize} height={currentSize.iconSize} className="center"/>
      )}
      <span>{loading ? loadingText : text}</span>
    </button>
  );
};