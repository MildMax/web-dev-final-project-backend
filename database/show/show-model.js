import mongoose from "mongoose";
import showSchema from "./show-schema.js";

const showModel = mongoose.model("ShowModel", showSchema);

export default showModel;