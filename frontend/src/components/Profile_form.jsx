import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Edit3, X, Save, User, Mail, Lock } from "lucide-react";

export default function Profile_form() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulate saving the profile data
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      console.log("Profile saved:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-3xl p-8 border border-gray-300 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Profile Information
          </h3>
          <button
            onClick={() => {
              if (isEditing) {
                setFormData(userData);
              }
              setIsEditing(!isEditing);
            }}
            className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 px-4 py-2 rounded-xl border border-blue-400/30 transition-colors"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 disabled:opacity-50"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 disabled:opacity-50"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">Bio</label>
            <div className="relative">
              <p className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm">
                Dream Home Estate is a trusted platform dedicated to helping
                people find their perfect home. We connect buyers, sellers, and
                renters with reliable property listings, expert guidance, and
                personalized support to make the journey of owning or renting a
                home simple and stress-free.
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
