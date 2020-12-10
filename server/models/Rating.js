import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RatingSchema = new Schema ({
    Restaurant: {
        type: String, //id
        required: true
    }, 
    User: {
        type: String, //id
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('rating', RatingSchema);