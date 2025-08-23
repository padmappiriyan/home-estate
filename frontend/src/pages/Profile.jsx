import React from 'react';
import Hero from '../components/Hero';
import Profile_form from '../components/Profile_form';
import Profile_card from '../components/Profile_card';

export default function Profile() {
  return (
    <div className="h-screen relative">
     
      <div className="h-2/3">
        <Hero />
      </div>

      
      <div className="absolute top-1/2 left-[18px] w-1/2 h-1/3">
        <Profile_form />
      </div>
      <div className='absolute top-1/2 right-[18px] w-1/2 h-1/3'>
      <Profile_card />
      </div>
    </div>
  );
}