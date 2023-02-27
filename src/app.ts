import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import measurementsRoutes from './routes/measurements.routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ORIGIN } from './config'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
)

// Routes
app.use('/', authRoutes)
app.use('/', measurementsRoutes)

export default app
