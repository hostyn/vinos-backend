import { type NextFunction, type Request, type Response } from 'express'
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
): Promise<void> => {
  // Checking for missing params and wrong types
  const anyError = MEASUREMENT_PARAMS.some(param => {
    if (req.body[param.name] == null) {
      res.status(400).json({ error: `${param.name}-required` })
      return true
    }

    // eslint-disable-next-line valid-typeof
    if (typeof req.body[param.name] !== param.type) {
      res.status(400).json({ error: `${param.name}-must-be-${param.type}` })
      return true
    }
    return false
  })

  if (anyError) return

  const { variety, type } = req.body

  // Check if variety is valid
  try {
    const wineVariety = await WineVariety.findById(variety)
    if (wineVariety == null) throw new Error('invalid-variety')
  } catch {
    res.status(400).json({ error: 'invalid-variety' })
    return
  }

  // Check if type is valid
  try {
    const wineType = await WineType.findById(type)
    if (wineType == null) throw new Error('invalid-type')
  } catch {
    res.status(400).json({ error: 'invalid-type' })
    return
  }

  next()
}
