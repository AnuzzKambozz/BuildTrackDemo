"use client";


// Utility function to generate initials
export const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


// Utility function to generate random color for avatars
export const getAvatarColor = (name: string): string => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };
  

  export const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50',
      pink: 'text-pink-600 bg-pink-50',
      red: 'text-red-600 bg-red-50',
      yellow: 'text-yellow-600 bg-yellow-50',
      indigo: 'text-indigo-600 bg-indigo-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };


export const isOnboardingDone = (): boolean => {
    // Check if we're in the browser environment
    return true
    // if (typeof window === 'undefined') {
    //   return false;
    // }
    
    // const user = localStorage.getItem("userProfile");
    // console.log(user);
    
    // if (user) {
    //   try {
    //     const userProfile = JSON.parse(user);
    //     return userProfile.company.is_onboarded;
    //   } catch (error) {
    //     console.error('Error parsing user profile:', error);
    //     return false;
    //   }
    // }
    
    // return false;
};

export const onboardingCurrentStep = (): number => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return 0;
    }
    
    const user = localStorage.getItem("userProfile");
    console.log(user);
    
    if (user) {
      try {
        const userProfile = JSON.parse(user);
        const stage = userProfile.company.onboarding_stage;
        return stage.sequence - 1
 
      } catch (error) {
        console.error('Error parsing user profile:', error);
        return 0;
      }
    }
    return 0;
  };