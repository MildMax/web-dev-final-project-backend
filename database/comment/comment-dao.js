import commentModel from "./comment-model.js";

export const getCommentsByUser = (userId) => commentModel.find({commentor_id: userId});
export const getCommentsByPost = (postId) => commentModel.find({post_id: postId});
export const addComment = (comment) => commentModel.create({comment});
export const deleteComment = (commentId) => commentModel.deleteOne({_id: commentId});
