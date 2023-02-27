import { Router } from 'express'
import {
  checkHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from '../controllers/auth.controller'
import {
  checkIfUserExists,
  requireEmailAndPassword,
  verifyEmailAndPassword,
} from '../middlewares/auth'
import { isAuthenticated } from '../middlewares/jwt'

const authRoutes = Router()

authRoutes.post('/login', requireEmailAndPassword, loginHandler)
authRoutes.post(
  '/registry',
  [requireEmailAndPassword, verifyEmailAndPassword, checkIfUserExists],
  registerHandler
)
authRoutes.get('/checkauth', [isAuthenticated], checkHandler)
authRoutes.post('/logout', logoutHandler)

export default authRoutes
