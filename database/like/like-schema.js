import mongoose from "mongoose"

const schema = mongoose.Schema({
    liker_id: String,
    post_id: String,
    type: String,
    timestamp, Date
}, { collection: "like" });

export default schema;