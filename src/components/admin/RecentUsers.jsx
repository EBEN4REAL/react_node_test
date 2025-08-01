import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "../../Services/hhtpClient";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await get("/admin/users");
      const sortedUsers = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedUsers);
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (utcDate) => {
    return new Date(utcDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };
  return (
    <div className="bg-white p-4 shadow rounded-lg col-span-2">
      <h3 className="text-xl font-semibold mb-4">Recent Users</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border border-gray-200">Name</th>
              <th className="p-2 text-left border border-gray-200">Email</th>
              <th className="p-2 text-left border border-gray-200">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : null
          }
          {!isLoading && users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No users found
                </td>
              </tr>
            </tbody>
          ) : null}

          {
            !isLoading && users.length > 0 && (
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-200">{user.fullName}</td>
                    <td className="p-2 border border-gray-200">{user.email}</td>
                    <td className="p-2 border border-gray-200">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
