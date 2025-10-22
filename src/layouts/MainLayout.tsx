import { Check, LogOut } from "lucide-react";
import { useState } from "react";

import { Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function MainLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("todo-token");
    toast.success("Logged out successfully");
    setLoading(false);
    navigate("/auth");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all  ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-lg transform hover:scale-105"
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
        <main className="p-6">
          <Outlet /> {/* 👈 Renders nested route components */}
        </main>
      </div>
    </div>
  );
}
