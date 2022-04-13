import mongoose from "mongoose";
import likeSchema from "./like-schema.js";

const likeModel = mongoose.model("LikeSchema", likeSchema);

export default likeModel;