import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a username"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email address"],
                unique: true
        },
        password: {
            type: String,
            required: [true, "please add a password"]
        }
    },
    {
        timestamps: true,
    }
);
const m = mongoose.model('User', userSchema);
export default m;