import { NextFunction, Request, Response } from 'express'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

const MEASUREMENT_PARAMS = [
  { name: 'year', type: 'number' },
  { name: 'variety', type: 'string' },
  { name: 'color', type: 'string' },
  { name: 'temperature', type: 'number' },
  { name: 'alcohol', type: 'number' },
  { name: 'ph', type: 'number' },
  { name: 'observations', type: 'string' },
]

export const validateMeasurementParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const anyError = MEASUREMENT_PARAMS.some(param => {
    if (req.body[param.name] == null) {
      res.status(400).json({ error: `${param.name} is required` })
      return true
    }

    if (typeof req.body[param.name] !== param.type) {
      res.status(400).json({ error: `${param.name} is must be ${param.type}` })
      return true
    }
    return false
  })

  if (anyError) return

  const { variety, type } = req.body

  const wineVariety = await WineVariety.findById(variety)
  console.log(wineVariety)

  const wineType = await WineType.findById(type)
  console.log(wineType)

  next()
}
