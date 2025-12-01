import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({
        success: false,
        message: "assignedTo must be an array of user IDs",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todoCheckList,
      attachments,
    });

    res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  // Fetch tasks based on user role and optional status filter
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    // Admin can see all tasks
    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      // Normal user sees only tasks assigned to them
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImageUrl");
    }

    // Add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    // Total tasks count (admin vs user)
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    // Pending tasks
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // In-progress tasks
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // Completed tasks
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // Response
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getTaskById = (req, res) => {};

export const updateTask = (req, res) => {};

export const deleteTask = (req, res) => {};

export const updateTaskStatus = (req, res) => {};

export const updateTaskChecklist = (req, res) => {};

export const getDashboardData = (req, res) => {};

export const getUserDashboardData = (req, res) => {};
