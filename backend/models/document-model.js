import mongoose from 'mongoose'

const documentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'text value required'],
    },
    isPublic: {
      type: Boolean,
      required: [true, 'Boolean value required'],
    },
    content: {
      type: String,
    },
    icon: {
      type: String   
    }
  },
  {
    timestamps: true,
  }
)

const m = mongoose.model('Document', documentSchema)
export default m
