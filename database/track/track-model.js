import mongoose from "mongoose";
import trackSchema from "./track-schema.js";

const trackModel = mongoose.model("TrackModel", trackSchema);

export default trackModel;