import albumModel from "./album-model.js";

export const createPost = (post) => albumModel.create(post);
export const getPost = (postId) => albumModel.findOne({post_id: postId});