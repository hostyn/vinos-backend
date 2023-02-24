import { Request, Response } from 'express'
import WineMeasurement from '../models/WineMeasurement'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

export const getMeasurementsHandler = async (req: Request, res: Response) => {
  const measurements = await WineMeasurement.find()
  res.status(200).json({ measurements })
}

export const postMeasurementHandler = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
}

export const getWineTypesHandler = async (req: Request, res: Response) => {
  const wineTypes = await WineType.find()
  res.status(200).json({ wineTypes })
}

export const getWineVarietiesHandler = async (req: Request, res: Response) => {
  const wineVarieties = await WineVariety.find()
  res.status(200).json({ wineVarieties })
}
