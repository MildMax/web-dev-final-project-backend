import followModel from "./follow-model.js";

export const addFollow = (follower_id, follower_name, followee_id, followee_name) => followModel.create({follower_id, follower_name, followee_id, followee_name});
export const removeFollow = (follower_id, followee_id) => followModel.deleteOne({follower_id, followee_id});
export const getFollowers = (id) => followModel.find({followee_id: id});
export const getFollowing = (id) => followModel.find({follower_id: id});