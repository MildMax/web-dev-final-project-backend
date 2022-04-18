import showModel from "./show-model.js";

export const createPost = (post) => showModel.create({post});
export const getPost = (postId) => showModel.find({_id: postId});