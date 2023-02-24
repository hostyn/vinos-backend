import { WineTypes, WINE_TYPES, WINE_VARIETIES } from '../constants'
import { db } from '../database'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

export const createWineTypesAndWineVarieties = async () => {
  await db

  const storedWineTypes = await WineType.find({ name: { $in: WINE_TYPES } })

  if (storedWineTypes.length) return

  const wineTypes = await Promise.all(
    WINE_TYPES.map(item => new WineType({ name: item }).save())
  )

  wineTypes.forEach(item => {
    const name = item.name as WineTypes
    WINE_VARIETIES[name].map(wineVariety => {
      new WineVariety({ name: wineVariety, type: item._id }).save()
    })
  })
}

createWineTypesAndWineVarieties()
