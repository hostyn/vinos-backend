import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'
import User from '../models/User'

interface IJWT {
  id: string
  iat: number
  exp: number
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization']

  // If no authorization provided
  if (!authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    // Decode JWT
    const decodedJWT = jwt.verify(token, PRIVATE_KEY) as IJWT

    const actualTimestamp = new Date().getTime() / 1000

    // If token expired
    if (actualTimestamp > decodedJWT.exp) {
      res.status(401).json({ error: 'Token expired' })
      return
    }

    // Search user
    const user = User.findById(decodedJWT.id)
    if (!user) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
  } catch {
    res.status(401).json({ error: 'Invalid token' })
    return
  }

  next()
}
