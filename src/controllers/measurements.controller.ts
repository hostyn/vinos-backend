import { Request, Response } from 'express'
import WineMeasurement from '../models/WineMeasurement'

export const getMeasurementsHandler = async (req: Request, res: Response) => {
  const measurements = await WineMeasurement.find()

  res.status(200).json({ measurements })
}
