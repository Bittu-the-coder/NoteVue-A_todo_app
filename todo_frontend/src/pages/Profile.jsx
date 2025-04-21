import React from "react";
import { FiUser, FiEdit, FiMail, FiCalendar } from "react-icons/fi";

const Profile = () => {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "Joined June 2023",
    bio: "Product designer and productivity enthusiast. Love building things that make people's lives easier.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">My Profile</h1>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
            />
            <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full hover:bg-purple-700 transition-colors">
              <FiEdit size={14} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-purple-900">
                  {user.name}
                </h2>
                <p className="text-purple-600">{user.joinDate}</p>
              </div>
              <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800">
                <FiEdit size={16} />
                Edit
              </button>
            </div>

            <p className="mt-3 text-purple-800">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4">
          Personal Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 border-b border-purple-100">
            <FiMail className="text-purple-600" />
            <div className="flex-1">
              <p className="text-sm text-purple-500">Email</p>
              <p className="font-medium text-purple-900">{user.email}</p>
            </div>
            <button className="text-purple-600 hover:text-purple-800">
              <FiEdit size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 border-b border-purple-100">
            <FiCalendar className="text-purple-600" />
            <div className="flex-1">
              <p className="text-sm text-purple-500">Member Since</p>
              <p className="font-medium text-purple-900">{user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4">
          Account Actions
        </h2>

        <div className="space-y-2">
          <button className="w-full text-left p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            Change Password
          </button>
          <button className="w-full text-left p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            Download My Data
          </button>
          <button className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
