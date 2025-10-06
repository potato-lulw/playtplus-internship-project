import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    targetType: { type: String, enum: ["post", "user"], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
