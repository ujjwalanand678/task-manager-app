import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"], //These enums restrict the allowed values.
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"], //These enums restrict the allowed values.
      default: "Pending",
    },
    dueDate: { type: Date, required: true },

    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    attachments: [{ type: String }],
    todoCheckList: [todoSchema],

    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

//These are relationships to your User model.
 //assignedTo is an array because one task can belong to multiple users
//createdBy is a single user who authored it
//The ref: "User" part tells Mongoose: “When you populate this, fetch the actual user documents.”

//Think of each “todo” as a sub-task inside a bigger task.
// text: the todo item’s description. Required, because a todo without text is cosmic nonsense.
//completed: a Boolean flag that defaults to false. This makes a new todo start its life unaccomplished,
//-like any good philosophical quest.
//This schema becomes a subdocument inside the main task.
//Attachments are simple strings (likely file URLs).
// todoChecklist embeds the earlier tiny todoSchema inside each task.
//A task can therefore have a whole swarm of little checkboxes.