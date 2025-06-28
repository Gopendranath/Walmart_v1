import { useAuth0 } from "@auth0/auth0-react";
// import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Shield, Lock } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-3xl animate-pulse"></div>
          
          {/* Main loader card */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            
            {/* Security icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Loading animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                
                {/* Inner ring */}
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin animate-reverse border-t-purple-600 dark:border-t-purple-400"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              </div>
            </div>

            {/* Loading text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Authenticating...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Securing your access and verifying credentials
              </p>
            </div>

            {/* Progress indicators */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">Checking authentication status</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                <span className="text-gray-600 dark:text-gray-400">Validating permissions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
                <span className="text-gray-600 dark:text-gray-400">Preparing your experience</span>
              </div>
            </div>

            {/* Loading bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Subtle message */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              This should only take a moment...
            </p>
          </div>

          {/* Floating particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-100 opacity-60"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce animation-delay-300 opacity-60"></div>
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce animation-delay-500 opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-pink-400 rounded-full animate-bounce animation-delay-700 opacity-60"></div>
        </div>

        {/* Custom CSS for animation delays */}
        <style>{`
          .animation-delay-100 { animation-delay: 0.1s; }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-300 { animation-delay: 0.3s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-500 { animation-delay: 0.5s; }
          .animation-delay-700 { animation-delay: 0.7s; }
          .animate-reverse { animation-direction: reverse; }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  return children;
};

export default PrivateRoute;