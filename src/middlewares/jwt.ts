import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { createEmptyCookie } from '../libs/cookie'
import { COOKIE_NAME, PRIVATE_KEY } from '../config'

interface IJWT {
  id: string
  iat: number
  exp: number
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies[COOKIE_NAME]

  try {
    // Decode JWT
    const decodedJWT = jwt.verify(token, PRIVATE_KEY) as IJWT

    const actualTimestamp = new Date().getTime() / 1000

    // If token expired
    if (actualTimestamp > decodedJWT.exp) {
      const cookie = createEmptyCookie()
      res.setHeader('Set-Cookie', cookie)
      res.status(401).json({ error: 'Token expired' })
      return
    }

    // Search user
    const user = User.findById(decodedJWT.id)
    if (user == null) {
      const cookie = createEmptyCookie()
      res.setHeader('Set-Cookie', cookie)
      res.status(401).json({ error: 'Invalid token' })
      return
    }
  } catch {
    const cookie = createEmptyCookie()
    res.setHeader('Set-Cookie', cookie)
    res.status(401).json({ error: 'Invalid token' })
    return
  }

  next()
}
