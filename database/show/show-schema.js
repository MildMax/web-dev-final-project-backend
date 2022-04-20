import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    spotify_url: String,
    name: String,
    publisher: String,
    total_episodes: String,
    description: String
},{ collection: "show"})

export default schema;