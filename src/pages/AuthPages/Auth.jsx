import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <div className="py-16 max-w-7xl mx-auto px-6">
               <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Choose Your Role</h2>
               <div className="mt-8 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
                 {["user", "admin"].map((role) => (
                   <motion.div
                     key={role}
                     className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                     whileHover={{ scale: 1.05 }}
                   >
                     <h3 className="text-2xl font-semibold capitalize text-gray-800">{role === "user" ? "Team Member" : "Administrator"}</h3>
                     <p className="mt-3 text-gray-600">
                       {role === "user"
                         ? "Create tasks, track progress, and collaborate with your team."
                         : "Manage users, verify tasks, and oversee team operations."}
                     </p>
                     <div className="mt-6 space-y-4">
                       <button
                         onClick={() => navigate("/signup", { state: { role } })}
                         className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition"
                       >
                         Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
                       </button>
                       <button
                         onClick={() => navigate("/login", { state: { role } })}
                         className="w-full py-3 border border-gray-400 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-200 transition"
                       >
                         Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
                       </button>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
    );
}

export default Login;