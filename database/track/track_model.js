import mongoose from "mongoose";
import trackSchema from "./track_schema.js";

const trackModel = mongoose.model("TrackModel", trackSchema);

export default trackModel;