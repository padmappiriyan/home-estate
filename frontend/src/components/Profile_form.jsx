import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit3, X, Save, User, Mail, Camera } from "lucide-react";
import { updateuserFailure, updateuserSuccess } from "../features/userSlice";
import { axiosInstance } from "../config/api";

export default function ProfileForm() {
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture || "https://via.placeholder.com/150",
    bio: currentUser.bio || "Dream house found! Welcome to your perfect home.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setFormData((prev) => ({
        ...prev,
        profilePicture: previewUrl,
      }));
      return () => URL.revokeObjectURL(previewUrl); 
    }
  }, [image]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);
      if (image) uploadData.append("profileImage", image);

      const res = await axiosInstance.post(
        `/api/user/update/${currentUser.userId}`,
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      
      dispatch(updateuserSuccess(res.data.user));
      setIsEditing(false);
      setImage(undefined); 
    } catch (error) {
      dispatch(updateuserFailure(error.message));
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      username: currentUser.username,
      email: currentUser.email,
      profilePicture: currentUser.profilePicture || "https://via.placeholder.com/150",
      bio: currentUser.bio || "Dream house found! Welcome to your perfect home.",
    });
    setImage(undefined);
    setIsEditing(false);
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl p-8 border border-gray-300 shadow-2xl relative">
      
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture}
            alt={formData.username || "User Profile"}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          {isEditing && (
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
              onClick={() => fileRef.current.click()}
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

       
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Profile Information
            </h3>
            <button
              type="button"
              onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
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

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            <div>
              <label className="block text-gray-700 text-sm mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 disabled:opacity-50"
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
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-12 py-3 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 disabled:opacity-50"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

           
            <div>
              <label className="block text-gray-700 text-sm mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                readOnly
                disabled
                rows={3}
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 resize-none"
              />
            </div>

            
            {isEditing && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
