import { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/registry', registerHandler)

export default authRoutes
