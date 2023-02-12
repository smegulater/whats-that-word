import mongoose from 'mongoose'

async function connectToDevelopmentDB() {
  try {
    const connString = 'mongodb://localhost:27017'
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(connString)

    console.log(`Connected to local instance of MongoDB: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.message.red.underline)
    process.exit(1)
  }
}

async function connectToProductionDB() {
  try {
    const connString = process.env.MONGO_DB_URI.replace('<username>', process.env.MONGO_DB_USER).replace(
      '<password>',
      process.env.MONGO_DB_PASS
    )
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(connString)
    console.log(`Connected to production instance of MongoDB: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.message.red)
    process.exit(1)
  }
}

const connectDb = async () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      await connectToDevelopmentDB()
      break
    case 'production':
      connectToProductionDB()
      break
    default:
      console.log('Incorrect NODE_ENV value. Unable to connect to a DB instance'.red)
      process.exit(1)
  }
}

export default connectDb
