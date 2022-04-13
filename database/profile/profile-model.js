import mongoose from "mongoose";
import profileSchema from "./profile-schema.js";

const profileModel = mongoose.model("ProfileModel", profileSchema);

export default profileModel;