import mongoose from "mongoose";

const schema = mongoose.Schema({
    follower_id: String,
    follower_name: String,
    followee_id: String,
    followee_name: String,
}, {collection: "follow"})

export default schema;