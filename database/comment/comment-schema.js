import mongoose from "mongoose";

const schema = mongoose.Schema({
    commentor_id: String
}, { collection: "comment" })

export default schema;