import { Router } from 'express'
import {
  getMeasurementsHandler,
  getWineTypesHandler,
  getWineVarietiesHandler,
  postMeasurementHandler,
} from '../controllers/measurements.controller'
import { isAuthenticated } from '../middlewares/jwt'
import { validateMeasurementParams } from '../middlewares/measurements'

const measurementsRoutes = Router()

measurementsRoutes.get('/measurements', isAuthenticated, getMeasurementsHandler)
measurementsRoutes.post(
  '/measurements',
  [isAuthenticated, validateMeasurementParams],
  postMeasurementHandler
)

measurementsRoutes.get('/winetypes', isAuthenticated, getWineTypesHandler)
measurementsRoutes.get(
  '/winevarieties',
  isAuthenticated,
  getWineVarietiesHandler
)

export default measurementsRoutes
