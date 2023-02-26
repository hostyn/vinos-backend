import { Router } from 'express'
import {
  checkHandler,
  loginHandler,
  logoutHandler,
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
authRoutes.post('/logout', logoutHandler)

export default authRoutes
