import mongoose, { PopulatedDoc } from 'mongoose'
import { IWineType } from './WineType'

export interface IWineVariety {
  name: string
  type: PopulatedDoc<IWineType>
}

const wineVarietySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WineType',
    },
  },
  { versionKey: false }
)

export default mongoose.model<IWineVariety>('WineVariety', wineVarietySchema)
