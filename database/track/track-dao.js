import trackModel from "./track-model.js";

export const createPost = (post) => trackModel.create({post});
export const getPost = (postId) => trackModel.find({post_id: postId});