import React from "react";
const styles = {


  glassCard: `
  relative z-1
  backdrop-blur-lg
  bg-white/5
  w-full 
  rounded-3xl
  p-6
  border border-white/10
  shadow-[0_30px_120px_rgba(0,0,0,0.45)]
`,

};
const UserCard = ({ userInfo }) => {
  return (
    <div className={styles.glassCard }>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <div>
            <p className="text-[15px] font-medium text-white">{userInfo?.name}</p>
            <p className="text-xs text-white">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex  items-end gap-2 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.pendingTasks || 0}
          status="In Progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.pendingTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";

      case "Completed":
        return "text-indigo-500 bg-gray-50";

      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[12px] font-medium ${getStatusTagColor()} px-2 py-0.5 rounded`}
    >
      <span className="text-[12px] font-semibold">{count}</span>
      <br />
      {label}
    </div>
  );
};
