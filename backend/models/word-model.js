import mongoose from "mongoose";

const wordSchema = mongoose.Schema(
    {
word: String,

    },
    {
        timestamps: true,
    }
);
const m = mongoose.model('Word', wordSchema);
export default m;