import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import measurementsRoutes from './routes/measurements.routes'
import cookieParser from 'cookie-parser'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/', authRoutes)
app.use('/', measurementsRoutes)

export default app
