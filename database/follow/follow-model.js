import mongoose from "mongoose";
import followSchema from "./follow-schema.js";

const followModel = mongoose.model("FollowModel", followSchema);

export default followModel;