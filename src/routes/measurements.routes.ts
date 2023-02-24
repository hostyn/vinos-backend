import { Router } from 'express'
import { getMeasurementsHandler } from '../controllers/measurements.controller'
import { isAuthenticated } from '../middlewares/jwt'

const measurementsRoutes = Router()

measurementsRoutes.get('/measurements', isAuthenticated, getMeasurementsHandler)

export default measurementsRoutes
