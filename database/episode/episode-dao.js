import episodeModel from "./episode-model.js";

export const createPost = (post) => episodeModel.create({post});
export const getPost = (postId) => episodeModel.find({post_id: postId});