import mongoose from 'mongoose'

export interface IWineType {
  name: string
}

const wineTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
)

export default mongoose.model<IWineType>('WineType', wineTypeSchema)
