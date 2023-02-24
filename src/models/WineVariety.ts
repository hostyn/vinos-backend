import mongoose from 'mongoose'

export interface IWineVariety {
  name: string
}

const wineVarietySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
)

export default mongoose.model<IWineVariety>('WineVariety', wineVarietySchema)
