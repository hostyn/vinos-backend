import { WINE_TYPES, WINE_VARIETIES } from '../constants'
import { db } from '../database'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

export const createWineTypesAndWineVarieties = async (): Promise<void> => {
  await db

  const storedWineTypes = await WineType.find({ name: { $in: WINE_TYPES } })

  if (storedWineTypes.length === 0) {
    await Promise.all(
      WINE_TYPES.map(async item => await new WineType({ name: item }).save())
    )
  }

  const storedWineVarieties = await WineVariety.find({
    name: { $in: WINE_VARIETIES },
  })

  if (storedWineVarieties.length === 0) {
    await Promise.all(
      WINE_VARIETIES.map(
        async item => await new WineVariety({ name: item }).save()
      )
    )
  }
}

void createWineTypesAndWineVarieties()
