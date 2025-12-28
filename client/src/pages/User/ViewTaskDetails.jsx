import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-400/20";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-400/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-400/20";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data.task);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoCheckList = [...task?.todoCheckList];
    if (!todoCheckList[index]) return;

    todoCheckList[index].completed = !todoCheckList[index].completed;

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoCheckList }
      );
      if (response.status === 200) {
        setTask(response.data?.task || task);
      }
    } catch {
      todoCheckList[index].completed = !todoCheckList[index].completed;
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) getTaskDetailsByID();
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div
        className="
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/15
          rounded-r-3xl
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          transition-all duration-300
        "
      >
        {task && (
          <div className="grid grid-cols-1 gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white tracking-wide">
                {task.title}
              </h2>

              <span
                className={`text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md ${getStatusTagColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            {/* Description */}
            <InfoBox label="Description" value={task.description} />

            {/* Meta Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoBox label="Priority" value={task.priority} />

              <InfoBox
                label="Due Date"
                value={
                  task.dueDate
                    ? moment(task.dueDate).format("Do MMM YYYY")
                    : "N/A"
                }
              />

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-white/60">
                  Assigned To
                </label>
                <AvatarGroup
                  avatars={
                    task.assignedTo?.map((item) => item.profileImageUrl) || []
                  }
                  maxVisible={5}
                />
              </div>
            </div>

            {/* Todo Checklist */}
            {task.todoCheckList?.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-white/60">
                  Todo Checklist
                </label>

                {task.todoCheckList.map((item, index) => (
                  <TodoCheckList
                    key={index}
                    text={item.text}
                    isChecked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>
            )}

            {/* Attachments */}
            {task.attachments?.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-white/60">
                  Attachments
                </label>

                {task.attachments.map((link, index) => (
                  <Attachment
                    key={index}
                    link={link}
                    index={index}
                    onClick={() => handleLinkClick(link)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

/* ---------- Sub Components ---------- */

const InfoBox = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wider text-white/60">
      {label}
    </label>
    <p className="text-sm font-medium text-white/95 leading-relaxed">
      {value}
    </p>
  </div>
);

const TodoCheckList = ({ text, isChecked, onChange }) => (
  <div
    className="
      flex items-center gap-3
      p-3 rounded-xl
      bg-white/5 border border-white/10
      hover:bg-white/10
      transition
    "
  >
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-4 h-4 accent-cyan-400 cursor-pointer"
    />
    <p
      className={`text-sm ${
        isChecked ? "line-through text-white/50" : "text-white/90"
      }`}
    >
      {text}
    </p>
  </div>
);

const Attachment = ({ link, index, onClick }) => (
  <div
    onClick={onClick}
    className="
      group
      w-full flex items-center justify-between
      bg-white/5
      border border-white/15
      rounded-xl
      px-4 py-3
      cursor-pointer
      hover:bg-white/10
      hover:border-white/30
      transition
    "
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <span className="text-xs text-white/50 font-semibold">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <p className="text-sm font-medium text-white truncate">{link}</p>
    </div>

    <LuSquareArrowOutUpRight className="text-white/60 group-hover:text-white transition" />
  </div>
);
