import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Picture: {
        type: String
    },
    Rating: {
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('user', UserSchema);
