import mongoose from 'mongoose'

const gameSchema = mongoose.Schema(
  {
    lobbyId: String,
    participants: [{ username: String, userId: String, isHost: Boolean, team: Number }],
    status: String,
    gameStatId: String,
    gameOptions: {
      totalRounds: Number,
      autoTeams: Boolean,
    },
  },
  {
    timestamps: true,
  }
)
const m = mongoose.model('Game', gameSchema)
export default m
