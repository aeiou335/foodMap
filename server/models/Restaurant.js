import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: String
    },
    Station: {
        type: Array,
        required: true
    },
    Type: {
        type: String
    },
    HowManyPeople: {
        type: Array,
        default: []
    },
    Reason: {
        type: Array,
        default: []
    },
    OfficialRating: {
        type: Number,
        required: true
    },
    UserRating: {
        type: Number
    },
    UserRatingCount: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('restaurant', resSchema);