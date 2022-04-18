import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: String,
    image_url: String,
    external_spotify_link: String,
    name: String,
    owner_display_name: String,
    description: String,
    total_tracks: String
},{ collection: "playlist"})

export default schema;