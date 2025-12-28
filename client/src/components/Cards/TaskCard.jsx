import React from "react";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";
import Progress from "../layouts/Progress";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoCheckList,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 font-semibold text-[13px] bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 font-semibold text-[13px] bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 font-semibold text-[13px] bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 font-semibold text-[13px] bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 font-semibold text-[13px] bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 font-semibold text-[13px] bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/5 rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all "
    >
      {/* Status & Priority */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`text-[11px] font-medium px-4 py-0.5 rounded-full ${getStatusTagColor()}`}
        >
          {status}
        </div>

        <div
          className={`text-[11px] font-medium px-4 py-0.5 rounded-full ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </div>
      </div>

      {/* Content */}
      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <p className="text-sm font-medium text-white/90 mt-4 line-clamp-1 ">
          {title}
        </p>

        <p className="text-xs text-white/90 mt-2 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-white/90 font-medium mt-2 mb-2">
          Task Done:{" "}
          <span className="font-semibold text-white/90">
            {completedTodoCount} / {todoCheckList.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Dates */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-white/90">Start Date</label>
            <p className="text-[13px] font-medium text-white/90">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <label className="text-xs text-white/90">Due Date</label>
            <p className="text-[13px] font-medium text-white/90">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 mx-4">
        <AvatarGroup avatars={assignedTo || []} />

        {attachmentCount > 0 && (
          <div className="flex items-center gap-2 bg-white/10 text-white px-2.5 py-1.5 rounded-lg">
            <LuPaperclip className="text-white" />
            <span className="text-xs text-white/90 font-medium">
              {attachmentCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
