import React from 'react'
import Happy_family from '../assets/Happy family.png'
import { useSelector } from 'react-redux'
export default function Hero() {
    const currentUser = useSelector((state) => state.user.currentUser);
  return (
     <div className="h-full  bg-cover bg-center opacity-60"
      style={{ backgroundImage: `url(${Happy_family})` }}
  >
     <div>
        <h1>
            Hello {currentUser?.username || 'Guest'}!
        </h1>
     </div>
    </div>
  )
}
