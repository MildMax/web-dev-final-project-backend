import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: String,
    image_url: String,
    name: String,
    show_name: String,
    release_date: String,
    description: String,
},{ collection: "episode"})

export default schema;