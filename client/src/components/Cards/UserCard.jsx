import React from "react";
const styles = {


  glassCard: `
  relative z-1
  backdrop-blur-lg
  bg-white/5
  w-full 
  rounded-3xl
  p-4
  mt-2
  border border-white/10
  hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all 
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
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white text-center text-sm"
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
        return "text-cyan-500 bg-cyan-50";

      case "Completed":
        return "text-indigo-500 bg-indigo-50";

      default:
        return "text-violet-500 bg-violet-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[12px] font-medium ${getStatusTagColor()} px-1.5 py-0.5 rounded`}
    >
      <span className="text-[12px] font-semibold">{count}</span>
      <br />
      {label}
    </div>
  );
};
