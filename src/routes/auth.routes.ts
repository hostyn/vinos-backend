import { Router } from 'express'
import {
  checkHandler,
  loginHandler,
  registerHandler,
} from '../controllers/auth.controller'
import { checkIfUserExists, verifyEmailAndPassword } from '../middlewares/auth'
import { isAuthenticated } from '../middlewares/jwt'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post(
  '/registry',
  [verifyEmailAndPassword, checkIfUserExists],
  registerHandler
)
authRoutes.get('/checkauth', [isAuthenticated], checkHandler)

export default authRoutes
