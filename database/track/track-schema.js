import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    external_spotify_link: String,
    name: String,
    album_name: String,
    album_id: String,
    release_date: String,
    track_duration: String,
    popularity: String
},{ collection: "track"})

export default schema;