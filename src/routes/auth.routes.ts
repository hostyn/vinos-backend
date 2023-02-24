import { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth.controller'
import { verifyEmailAndPassword } from '../middlewares/auth'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/registry', verifyEmailAndPassword, registerHandler)

export default authRoutes
