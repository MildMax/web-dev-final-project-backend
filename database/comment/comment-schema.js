import mongoose from "mongoose";

const schema = mongoose.Schema({
    commentor_id: String,
    post_id: String,
    type: String,
    timestamp: Date
}, { collection: "comment" })

export default schema;