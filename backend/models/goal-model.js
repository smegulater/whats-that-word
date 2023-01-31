import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        text: {
            type: String,
            required: [true, "text value required"]
        }
    },
    {
        timestamps: true,
    }
);

const m = mongoose.model('Goal', goalSchema);
export default m;