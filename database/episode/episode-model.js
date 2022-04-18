import mongoose from "mongoose";
import episodeSchema from "./episode-schema.js";

const episodeModel = mongoose.model("EpisodeModel", episodeSchema);

export default episodeModel;