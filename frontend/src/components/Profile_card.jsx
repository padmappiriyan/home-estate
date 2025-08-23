import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile_card() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="relative max-w-xl bg-white rounded-3xl p-6 border border-gray-300 shadow-2xl mx-auto">
      {/* Profile Image */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <img
          src={currentUser.profilePicture || 'https://via.placeholder.com/150'}
          alt={currentUser.username || 'User Profile'}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
      </div>

      {/* User Information */}
      <div className="mt-20 space-y-4 text-center">
        <div>
          <span className="block font-medium text-gray-700">Username:</span>
          <span className="text-gray-600">{currentUser.username || 'N/A'}</span>
        </div>
        <div>
          <span className="block font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{currentUser.email || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}