import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: String,
    image_url: String,
    external_spotify_link: String,
    name: String,
    album_name: String,
    release_date: String,
    track_duration: String,
    popularity: String
},{ collection: "track"})

export default schema;