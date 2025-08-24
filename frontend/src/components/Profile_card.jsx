import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function Profile_card() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    try {
     
    
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative  bg-white rounded-xl p-4 border border-gray-300  mx-auto">
     
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <img
          src={currentUser.profilePicture || 'https://via.placeholder.com/150'}
          alt={currentUser.username || 'User Profile'}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
      </div>

      
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

      
      <div className="bg-[#c9b1e1]  rounded-xl p-8 opacity-65 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Security</h3>
          <button
            onClick={() => {
              setShowPasswordForm(!showPasswordForm);
              setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              });
            }}
            className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-800 cursor-pointer px-4 py-2 rounded-xl border border-purple-400/30 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>{showPasswordForm ? 'Cancel' : 'Change Password'}</span>
          </button>
        </div>

        {showPasswordForm ? (
          <div className="space-y-6">
          
            <div>
              <label className="block text-gray-700 text-sm mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
                  placeholder="Enter current password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

         
            <div>
              <label className="block text-gray-700 text-sm mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
                  placeholder="Enter new password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

           
            <div>
              <label className="block text-gray-700 text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
                  placeholder="Confirm new password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Keep your account secure by updating your password regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}