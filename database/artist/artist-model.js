import mongoose from "mongoose";
import artistSchema from "./artist-schema.js";

const artistModel = mongoose.model("ArtistModel", artistSchema);

export default artistModel;