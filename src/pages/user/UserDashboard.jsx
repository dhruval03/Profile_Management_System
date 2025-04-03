import React from "react";
import Header from "../../components/layouts/Header";
import useAuthStore from "../../store/authStore";  

const UserDashboard = () => {
  const { user } = useAuthStore();  

  return (
    <div>
      <Header user={user} />  
      <h2>User Dashboard</h2>
    </div>
  );
};

export default UserDashboard;
