import React, { useEffect, useState } from "react";
import { get } from "../../Services/hhtpClient";

const AdminStats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const fetchUsers = async () => {
    try {
      const result = await get("/admin/users");
      setTotalUsers(result.data.length);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Tasks from Local Storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setTotalTasks(storedTasks.length);
    setPendingTasks(storedTasks.filter((task) => task.progress < 100).length);
    setCompletedTasks(
      storedTasks.filter((task) => task.progress === 100).length
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Users */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
      </div>

      {/* Total Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Tasks</h3>
        <p className="text-3xl font-bold text-purple-600">{totalTasks}</p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
      </div>
    </div>
  );
};

export default AdminStats;
