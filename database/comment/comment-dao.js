import commentModel from "./comment-model.js";

export const getCommentsByUser = (userId) => commentModel.find({commentor_id: userId});