import artistModel from "./artist-model.js";

export const createPost = (post) => artistModel.create(post);
export const getPost = (postId) => artistModel.findOne({post_id: postId});