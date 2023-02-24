import mongoose, { PopulatedDoc } from 'mongoose'
import { IWineType } from './WineType'
import { IWineVariety } from './WineVariety'

interface IWineMeasurement {
  year: number
  variety: PopulatedDoc<IWineVariety>
  type: PopulatedDoc<IWineType>
  color: string
  temperature: number
  alcohol: number
  ph: number
  observations: string
}

const wineMeasurementSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
    },
    variety: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WineVariety',
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WineType',
    },
    color: {
      type: String,
    },
    temperature: {
      type: Number,
    },
    alcohol: {
      type: Number,
    },
    ph: {
      type: Number,
    },
    observations: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model<IWineMeasurement>(
  'WineMeasurements',
  wineMeasurementSchema
)
