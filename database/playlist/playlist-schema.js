import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    spotify_url: String,
    name: String,
    owner_display_name: String,
    description: String,
    total_tracks: String
},{ collection: "playlist"})

export default schema;