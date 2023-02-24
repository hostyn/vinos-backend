import { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth.controller'
import { checkIfUserExists, verifyEmailAndPassword } from '../middlewares/auth'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post(
  '/registry',
  [verifyEmailAndPassword, checkIfUserExists],
  registerHandler
)

export default authRoutes
