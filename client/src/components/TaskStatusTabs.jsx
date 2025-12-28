import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 mt-4 ">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`
            relative px-4 py-2 text-sm rounded-lg transition-all cursor-pointer 
            ${activeTab === tab.label
              ? "text-white bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all "
              : "text-white/60 hover:text-white"}
          `}
        >
          <div className="flex items-center gap-2">
            <span>{tab.label}</span>

            <span
              className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeTab === tab.label
                  ? "bg-white/90 text-black"
                  : "bg-white/20 text-white"}
              `}
            >
              {tab.count}
            </span>
          </div>

          {activeTab === tab.label && (
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
