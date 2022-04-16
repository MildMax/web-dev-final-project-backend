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
    isAdmin: Boolean,
    isArtist: Boolean,
    artistId: String,
    artistName: String,
},{ collection: "profiles"})

export default schema;