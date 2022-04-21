import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    spotify_url: String,
    name: String,
    genres: String,
    followers_total: Number,
    popularity: Number

},{ collection: "artist"})

export default schema;