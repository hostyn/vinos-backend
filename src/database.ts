import mongoose from 'mongoose'
import { MONGODB_URI } from './config'
import { createWineTypesAndWineVarieties } from './libs/initialSetup'

mongoose.set('strictQuery', true)

export const db = mongoose.connect(MONGODB_URI).then(db => {
  console.log('Database is connected to', db.connection.name)
  void createWineTypesAndWineVarieties()
})
