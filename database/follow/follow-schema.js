import mongoose from "mongoose";

const schema = mongoose.Schema({
    follower_id: String,
    followee_id: String,
}, {collection: "follow"})

export default schema;