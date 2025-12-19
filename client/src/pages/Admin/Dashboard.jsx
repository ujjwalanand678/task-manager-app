import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  return (
    <div>
      Dashboard
      {JSON.stringify(user)}
    </div>
  );
};

export default Dashboard;
