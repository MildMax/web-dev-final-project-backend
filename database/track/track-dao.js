import trackModel from "./track_model.js";

export const createPost = (post) => trackModel.create({post});
export const getPost = (postId) => trackModel.find({_id: postId});