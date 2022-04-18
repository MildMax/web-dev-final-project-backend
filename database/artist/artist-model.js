import mongoose from "mongoose";
import artistSchema from "./artist_schema.js";

const artistModel = mongoose.model("ArtistModel", artistSchema);

export default artistModel;