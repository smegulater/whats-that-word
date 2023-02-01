import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    const connString = process.env.MONGO_DB_URI.replace('<username>', process.env.MONGO_DB_USER).replace(
      '<password>',
      process.env.MONGO_DB_PASS
    )
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(connString)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.message.red.underline)
    process.exit(1)
  }
}

export default connectDb
