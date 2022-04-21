import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    spotify_url: String,
    name: String,
    album_name: String,
    album_id: String,
    artist_name: String,
    artist_id: String,
    release_date: String,
    track_duration: String,
    popularity: String
},{ collection: "track"})

export default schema;