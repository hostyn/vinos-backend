import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User'

export const verifyEmailAndPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body

  // Check if email exists
  if (email == null) {
    res.status(400).json({ error: 'Email is required' })
    return
  }

  // Check if password exists
  if (password == null) {
    res.status(400).json({ error: 'Password is required' })
    return
  }

  // Check email with regex
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400).json({ error: 'Invalid email' })
    return
  }

  // Check if password have at least 8 characters
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must have at least 8 characters' })
    return
  }

  next()
}

export const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body

  // Search for a user with the same email
  const matchingUser = await User.findOne({ email })

  if (matchingUser != null) {
    res.status(400).json({ error: 'User already exists' })
    return
  }

  next()
}
