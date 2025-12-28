import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/input/SelectDropdown.jsx";
import SelectUsers from "../../components/input/SelectUsers.jsx";
import TodoListInput from "../../components/input/TodoListInput.jsx";
import AddAttachmentsInput from "../../components/input/AddAttachmentsInput.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";
import Model from "../../components/Model.jsx";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [taskId, setTaskId] = useState(() => location.state?.taskId || "");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = (taskData.todoCheckList || []).map((item) =>
        typeof item === "string"
          ? { text: item, completed: false }
          : // assume it's already an object with text/completed
            { text: item.text ?? "", completed: !!item.completed }
      );

      
      const payload = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todolist,
      };
      // console.log("Creating task payload:", payload);
      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);

      toast.success("Task Created Successfully");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoCheckList?.map((item) => {
        const prevTodoCheckList = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoCheckList.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todolist,
      });

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    // Input validation
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }

    if (taskData.todoCheckList?.length === 0) {
      setError("Add atleast one todo task");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      const taskInfo = response.data.task;

      if (!taskInfo) {
        toast.error("Task not found");
        navigate("/admin/tasks");
        return;
      }

      setCurrentTask(taskInfo);

      setTaskData({
        title: taskInfo.title || "",
        description: taskInfo.description || "",
        priority: taskInfo.priority || "Low",
        dueDate: taskInfo.dueDate
          ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
          : null,
        assignedTo: taskInfo.assignedTo?.map((u) => u._id) || [],
        todoCheckList: taskInfo.todoCheckList?.map((t) => t.text) || [],
        attachments: taskInfo.attachments || [],
      });
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Failed to fetch task");
      navigate("/admin/tasks");
    }
  };

  // Delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Fetch task details on ID change
  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div
        className="
        
    bg-white/5
    p-8
    backdrop-blur-xl
    border border-white/20
    transition-all
    rounded-r-3xl
    rounded-l-none
    
   
  "
      >
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="w-full md:col-span-2 lg:col-span-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-medium text-white/90">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex cursor-pointer bg-red-50 px-2 py-1 rounded items-center gap-1 text-[13px] font-medium text-red-500 hover:text-red-600 transition-colors"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 /> Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-white/90">
                Task Title
              </label>
              <input
                className="
            mt-1 w-full
            bg-white/10
            border border-white/70
            rounded-md
            px-3 py-2
            text-white
            placeholder:text-white/70
            focus:outline-none
            focus:border-white
          "
                placeholder="Create App UI"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-white/90">
                Description
              </label>

              <textarea
                placeholder="Describe task"
                className="
            mt-1 w-full
            bg-white/10
            border border-white/70
            rounded-md
            px-3 py-2
            text-white
            placeholder:text-white/70
            focus:outline-none
            focus:border-white
          "
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {/* Priority */}
              <div>
                <label className="text-sm font-medium text-white/90">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="text-sm font-medium text-white/90">
                  Due Date
                </label>

                <input
                  className="
        mt-1 w-full
        bg-black/10
        border border-black/20
        rounded-md
        px-3 py-2
        text-black  
        
        focus:outline-none
        focus:border-white/40
      "
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                  style={{ filter: "invert(1)" }}
                />
              </div>

              {/* Assign To */}
              <div>
                <label className="text-sm font-medium text-white/90">
                  Assign To
                </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-white/90">
                TO DO Checklist
              </label>

              <TodoListInput
                todoList={taskData?.todoCheckList}
                setTodoList={(value) =>
                  handleValueChange("todoCheckList", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-white/90">
                Add Attachments
              </label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-400 mt-5">{error}</p>
            )}

            <div className="flex justify-center mt-7">
              <button
                className="
w-full 
     cursor-pointer
            px-6 py-2
            rounded-md
            bg-white/20
            text-white
            font-semibold
            border border-white/30
            hover:bg-white/30
            transition-all
             hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]
          "
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Model
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Model>
    </DashboardLayout>
  );
};

export default CreateTask;
