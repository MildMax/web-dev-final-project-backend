import mongoose from "mongoose";

const schema = mongoose.Schema({
    commentor_id: String,
    commentor_name: String,
    post_id: String,
    post_name: String,
    image_url: String,
    type: String,
    timestamp: Number,
    comment: String
}, { collection: "comment" })

export default schema;