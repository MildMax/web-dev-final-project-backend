import profileModel from "./profile-model.js";

export const createProfile = (profile) => profileModel.create(profile);
export const getProfileByEmail = (email) => profileModel.findOne({email});
export const getProfileByCredentials = (email, password) => profileModel.findOne({email, password});
export const getProfileById = (_id) => profileModel.findOne({_id});
export const updateProfile = (_id, profile) => profileModel.updateOne({_id}, {$set: profile})