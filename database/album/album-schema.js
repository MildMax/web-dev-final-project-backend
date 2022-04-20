import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    spotify_url: String,
    name: String,
    album_type: String,
    artist_name: String,
    artist_id: String,
    release_name: String,
    total_tracks: String
},{ collection: "album"})

export default schema;