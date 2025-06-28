import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { Loader, User, Mail, Shield, Calendar } from "lucide-react";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log("user:", user);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader className="animate-spin w-12 h-12 text-blue-600 dark:text-blue-400" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {isAuthenticated ? (
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-3xl transform rotate-1"></div>
            
            {/* Main profile card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Header background */}
              <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition-opacity blur-lg"></div>
                    <img
                      src={user?.picture || "https://randomuser.me/api/portraits/men/1.jpg"}
                      alt={user?.name || 'User'}
                      className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile content */}
              <div className="pt-20 pb-8 px-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {user?.name || 'Welcome User'}
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email || 'No email available'}</span>
                  </div>
                  
                  {/* Status badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Authenticated User
                  </div>
                </div>

                {/* Profile stats/info cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Profile</p>
                        <p className="font-semibold text-gray-900 dark:text-white">Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-4 border border-purple-100 dark:border-purple-800/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Security</p>
                        <p className="font-semibold text-gray-900 dark:text-white">Verified</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                        <p className="font-semibold text-gray-900 dark:text-white">2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional user info */}
                {user?.sub && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                        <span className="text-gray-900 dark:text-white font-mono text-xs">{user.sub.substring(0, 20)}...</span>
                      </div>
                      {user?.email_verified !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Email Verified:</span>
                          <span className={`${user.email_verified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} font-medium`}>
                            {user.email_verified ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <LogoutButton />
                  <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-600">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-3xl"></div>
              
              {/* Login card */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-600 dark:text-gray-400">Sign in to access your profile and continue your journey with us.</p>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Secure authentication</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Personalized experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span>Access all features</span>
                  </div>
                </div>

                <LoginButton />
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;