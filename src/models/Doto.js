import mongoose from "mongoose";

const DotoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    task: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    department: { type: String, required: true, default: "all" },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true, default: "pending" },
    states: { type: String, required: false, default: "pending" },
    comment: { type: String, required: false, default: "" },
    review: { type: String, required: false, default: "" },
    reviewStatus: { type: String, required: false, default: "pending" },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: { type: Boolean, required: true, default: false },
    priority: { type: String, required: true, default: "low" },
    branch: { type: String, required: true, default: "general" },
  },
  { timestamps: true },
);

/**
 * Helper function to sync status/states and update reviewStatus
 */
const handleUpdates = (update) => {
  if (!update) return;

  // Handle both direct updates and $set updates
  const data = update.$set || update;

  // Sync Status and States
  if (data.status && !data.states) data.states = data.status;
  if (data.states && !data.status) data.status = data.states;

  // Logic: If a review is being added, automatically set reviewStatus to "completed"
  if (data.review && data.review.trim() !== "") {
    data.reviewStatus = "completed";
  }
};

// 1. Hook for .save() (Create)
DotoSchema.pre("save", function (next) {
  handleUpdates(this);
  next();
});

// 2. Hook for findOneAndUpdate
DotoSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  handleUpdates(update);
  next();
});

// 3. Hook for updateOne
DotoSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();
  handleUpdates(update);
  next();
});

const Doto = mongoose.model("Doto", DotoSchema);
export default Doto;
