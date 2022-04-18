import mongoose from "mongoose";
import playlistSchema from "./playlist-schema.js";

const playlistModel = mongoose.model("PlaylistModel", playlistSchema);

export default playlistModel;