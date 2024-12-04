import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    IDCard: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", studentSchema);
