import likeModel from "./like-model.js";

export const getLikesByUser = (userId) => likeModel.find({liker_id: userId});