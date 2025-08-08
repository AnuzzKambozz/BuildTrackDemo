'use client';

import { getAvatarColor, getInitials } from '@/app/utility/common_utils';
import React, { useState } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  isGroup?: boolean;
}

const Avatar = ({ src, alt, size = 'md', isOnline = false, isGroup = false }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const initials = getInitials(alt);
  const colorClass = getAvatarColor(alt);

  const dimension = sizeMap[size];
  const textClass = textSizeMap[size];

  return (
    <div className="relative">
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className={`rounded-full object-cover ${textClass}`}
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className={`rounded-full ${colorClass} flex items-center justify-center text-white font-semibold ${textClass}`}
          style={{ width: dimension, height: dimension }}
        >
          {isGroup ? <Users size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} /> : initials}
        </div>
      )}

      {isOnline && !isGroup && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
