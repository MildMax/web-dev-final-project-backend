import mongoose from "mongoose";
import albumSchema from "./album-schema.js";

const albumModel = mongoose.model("AlbumModel", albumSchema);

export default albumModel;