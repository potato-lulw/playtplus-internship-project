import mongoose, { Schema } from "mongoose";


const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" }, 
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);