import { Check } from "lucide-react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                TaskFlow
              </h1>
              <p className="text-gray-500">
                Organize your life, one task at a time
              </p>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
