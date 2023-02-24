import mongoose from 'mongoose'
import { MONGODB_URI } from './config'

mongoose.set('strictQuery', true)

export const db = mongoose
  .connect(MONGODB_URI)
  .then(db => console.log('Database is connected to', db.connection.name))
