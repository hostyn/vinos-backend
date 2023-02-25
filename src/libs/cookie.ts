import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import type mongoose from 'mongoose'
import { COOKIE_NAME, PRIVATE_KEY } from '../config'

export const createCookie = (userId: mongoose.Types.ObjectId): string => {
  const token = jwt.sign({ id: userId }, PRIVATE_KEY, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  })

  return cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    secure: false,
    sameSite: 'none',
    path: '/',
  })
}

export const createEmptyCookie = (): string => {
  return cookie.serialize(COOKIE_NAME, '', {
    httpOnly: true,
    maxAge: 0,
    secure: false,
    sameSite: 'none',
    path: '/',
  })
}
