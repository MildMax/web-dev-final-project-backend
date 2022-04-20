import likeModel from "./like-model.js";

export const getLikesByUser = (userId) => likeModel.find({liker_id: userId});
export const likeContent = (like) => likeModel.create(like);
export const unlikeContent = (likeId) =>likeModel.deleteOne({_id: likeId});
export const getLikesByPost = (postId) => likeModel.find({post_id: postId});