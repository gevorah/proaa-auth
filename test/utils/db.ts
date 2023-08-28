import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection, disconnect } from 'mongoose'

let mongod: MongoMemoryServer = null!

const connectDb = async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri() + 'test'
  await connect(uri)
}

const closeDb = async () => {
  await connection.dropDatabase()
  await disconnect()
  await mongod.stop()
}

const clearDb = async () => {
  const collections = await connection.db.collections()
  collections.forEach(async collection => {
    await collection.drop()
  })
}

export { connectDb, closeDb, clearDb }
