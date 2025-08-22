import React from 'react';
import Happy_family from '../assets/Happy family.png';
import { useSelector } from 'react-redux';

export default function Hero() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div
      className="h-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Happy_family})` }}
    >
     
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b2d59]/60 to-[#2b2d59]/60"></div>

     
      <div className="relative h-full flex flex-col justify-center items-start px-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Hello, {currentUser?.username || 'Guest'}!
        </h1>
        <p className="text-lg">
          Welcome to DreamHome. Let’s find your perfect place to live.
        </p>
      </div>
    </div>
  );
}