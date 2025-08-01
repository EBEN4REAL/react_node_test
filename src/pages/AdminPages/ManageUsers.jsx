// import React, { useState } from "react";
// import Sidebar from "../../components/admin/Sidebar";
// import { useEffect } from "react";
// //import { useState } from "react";
// const ManageUsers = () => {
//   // Dummy user data
//   // const [users, setUsers] = useState([
//   //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   //   { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
//   // ]);
//   // const [users, setUsers] = useState([]);
//   const [user, setUsers] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:5000/admin/users") // Backend API
//       .then((res) => res.json())
//       .then((data) => {
//         const sortedUsers = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setUsers(sortedUsers);
//       })
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);
//   const [editingUser, setEditingUser] = useState(null);
//   const [editedData, setEditedData] = useState({ fullName: "", email: "", role: "" });

//   const startEditing = (selectedUser) => {
//     setEditingUser(selectedUser.email);
//     setEditedData({ fullName: selectedUser.fullName, email: selectedUser.email, role: selectedUser.role });
//   };

//   // const saveUser = (email) => {
//   //   setUsers(user.map(user => (user.email === email ? { ...user, ...editedData } : user)));
//   //   setEditingUser(null);
//   // };
//   const saveUser = (email) => {
//     setUsers(
//       user.map((u) => (u.email === email ? { ...u, ...editedData } : u))
//     );
//     setEditingUser(null);
//   };
//   // const deleteUser = (email) => {
//   //   setUsers(user.filter(user => user.email !== email));
//   // };
//   const deleteUser = async (email) => {
//     try {
//       const res = await fetch(`http://localhost:5000/admin/users/${email}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete user");
//       }

//       setUsers(user.filter((u) => u.email !== email));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h1>

//         {/* User Table */}
//         <div className="bg-white p-4 shadow rounded-lg">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-2">ID</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Role</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//   {user
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest users first
//     .map((user, index) => (
//       <tr key={user.email} className="border-b">
//         <td className="p-2">{index + 1}</td> {/* Row number */}
//         <td className="p-2">{user.fullName}</td>
//         <td className="p-2">{user.email}</td>
//         <td className="p-2">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
//         <td className="p-2">
//           <button
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             onClick={() => startEditing(user)}
//           >
//             Edit
//           </button>
//           <button
//             className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
//             onClick={() => deleteUser(user.email)}
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ))}
// </tbody>
//           </table>

//           {user.length === 0 && <p className="text-gray-500 text-center mt-4">No users found.</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { get, del } from "../../Services/hhtpClient";

const ManageUsers = () => {
  const [userLogs, setUserLogs] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const fetchUserLogs = async () => {
    try {
      const result = await get("/admin/userLogs");
      const sortedUsers = result.data.sort(
        (a, b) => new Date(b.loginTime) - new Date(a.loginTime)
      );
      console.log("User logs => 147", sortedUsers);
      setUserLogs(sortedUsers);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };
  useEffect(() => {
    fetchUserLogs();
  }, []);

  const startEditing = (user) => {
    setEditingUser(user.email);
    setEditedData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const saveUser = async (email) => {
    try {
      const res = await fetch(
        `https://zidio-task-management-backend.onrender.com/admin/users/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedData),
        }
      );

      if (!res.ok) throw new Error("Failed to update user");

      setUserLogs(
        users.map((u) => (u.email === email ? { ...u, ...editedData } : u))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (email) => {
    try {
      await del(`/admin/users/${email}`);
      setUserLogs(users.filter((u) => u.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteLog = async (id) => {
  try {
    await del(`/admin/userLogs/${id}`);
    setUserLogs((prevLogs) => prevLogs.filter((log) => log._id !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h1>

        <div className="bg-white p-4 shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">User</th>
                <th className="p-2">Role</th>
                <th className="p-2">JWT Token</th>
                <th className="p-2">IP Address</th>
                <th className="p-2">Login Time</th>
                <th className="p-2">Logout Time</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((log, index) => (
                <tr key={log._id} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{log.username}</td>
                  <td className="p-2">
                    {log.role.charAt(0).toUpperCase() + log.role.slice(1)}
                  </td>
                  <td className="p-2 truncate max-w-xs">{log.jwtToken}</td>
                  <td className="p-2">{log.ipAddress}</td>
                  <td className="p-2">
                    {new Date(log.loginTime).toLocaleString()}
                  </td>
                  <td className="p-2">
                    {log.logoutTime
                      ? new Date(log.logoutTime).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteLog(log._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {userLogs.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No user logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
