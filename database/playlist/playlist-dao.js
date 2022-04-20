import playlistModel from "./playlist-model.js";

export const createPost = (post) => playlistModel.create({post});
export const getPost = (postId) => playlistModel.find({_id: postId});