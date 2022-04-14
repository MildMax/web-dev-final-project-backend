import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: String,
    name: String,
    dob: String,
    email: String,
    website: String,
    joined: String,
    bio: String,
    password: String,
    profilePicture: String,
    isArtist: Boolean,
    isAdmin: Boolean,
    artistId: String
},{ collection: "profiles"})

export default schema;