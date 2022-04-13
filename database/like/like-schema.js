import mongoose from "mongoose"

const schema = mongoose.Schema({
    liker_id: String,
}, { collection: "like" });

export default schema;