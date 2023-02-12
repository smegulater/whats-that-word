import mongoose from "mongoose";

const gameStatSchema = mongoose.Schema(
    {

    },
    {
        timestamps: true,
    }
);
const m = mongoose.model('GameStat', gameStatSchema);
export default m;