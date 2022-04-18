import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: String,
    image_url: String,
    name: String,
    artist_name: String,
    release_name: String,
    total_tracks: String
},{ collection: "album"})

export default schema;