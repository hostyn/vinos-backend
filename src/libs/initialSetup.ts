import { WINE_TYPES, WINE_VARIETIES } from '../constants'
import { db } from '../database'
import WineMeasurement from '../models/WineMeasurement'
import WineType from '../models/WineType'
import WineVariety from '../models/WineVariety'

export const createWineTypesAndWineVarieties = async (): Promise<void> => {
  await db

  const storedWineTypes = await WineType.find({ name: { $in: WINE_TYPES } })

  let wineTypes: any = []
  if (storedWineTypes.length === 0) {
    wineTypes = await Promise.all(
      WINE_TYPES.map(async item => await new WineType({ name: item }).save())
    )
  }

  const storedWineVarieties = await WineVariety.find({
    name: { $in: WINE_VARIETIES },
  })

  let wineVarieties: any = []
  if (storedWineVarieties.length === 0) {
    wineVarieties = await Promise.all(
      WINE_VARIETIES.map(
        async item => await new WineVariety({ name: item }).save()
      )
    )
  }

  // Add sample measurements
  const storedMeasurements = await WineMeasurement.find()
  if (storedMeasurements.length === 0) {
    await new WineMeasurement({
      year: 2012,
      variety: wineVarieties[1]._id,
      type: wineTypes[1]._id,
      alcohol: 5.5,
      observations: 'VEGA REAL EL EMPECINADO',
      color: 'Tinto',
      ph: 3.3,
      temperature: 21.5,
    }).save()

    await new WineMeasurement({
      year: 2021,
      variety: wineVarieties[5]._id,
      type: wineTypes[0]._id,
      alcohol: 4.6,
      observations: 'ATRIUM',
      color: 'Blanco',
      ph: 3,
      temperature: 23.2,
    }).save()

    await new WineMeasurement({
      year: 2016,
      variety: wineVarieties[2]._id,
      type: wineTypes[2]._id,
      alcohol: 6.5,
      observations: 'CHIVITE',
      color: 'Tinto',
      ph: 3.1,
      temperature: 20.1,
    }).save()
  }
}

void createWineTypesAndWineVarieties()
