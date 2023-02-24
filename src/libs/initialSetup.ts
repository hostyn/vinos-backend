import { WINE_TYPES, WINE_VARIETIES } from '../constants'
import { db } from '../database'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

export const createWineTypesAndWineVarieties = async () => {
  await db

  const storedWineTypes = await WineType.find({ name: { $in: WINE_TYPES } })

  if (!storedWineTypes.length) {
    await Promise.all(
      WINE_TYPES.map(item => new WineType({ name: item }).save())
    )
  }

  const storedWineVarieties = await WineVariety.find({
    name: { $in: WINE_VARIETIES },
  })

  if (!storedWineVarieties.length) {
    await Promise.all(
      WINE_VARIETIES.map(item => new WineVariety({ name: item }).save())
    )
  }
}

createWineTypesAndWineVarieties()
