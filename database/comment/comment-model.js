import mongoose from "mongoose";
import commentSchema from "./comment-schema.js";

const commentModel = mongoose.model("CommentModel", commentSchema);

export default commentModel;