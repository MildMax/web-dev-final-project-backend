import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: String,
    image_url: String,
    external_spotify_link: String,
    name: String,
},{ collection: "artist"})

export default schema;