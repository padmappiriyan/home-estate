import React from 'react';
import Hero from '../components/Hero';
import Profile_form from '../components/Profile_form';
import Profile_card from '../components/Profile_card';

export default function Profile() {
  return (
    <div className="h-dvh relative">
     
      <div className="h-2/3">
        <Hero />
      </div>

     <div className='flex itmes-center justify-between  absolute top-1/2  p-4 w-full h-full'>
      <div className="w-full h-full p-5">
        <Profile_form />
      </div>
      <div className='w-full h-full p-5 '>
      <Profile_card />
      </div>
    </div>
      
    </div>
  );
}