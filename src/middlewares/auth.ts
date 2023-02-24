import { NextFunction, Request, Response } from 'express'

export const verifyEmailAndPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  // Check if email exists
  if (!email) {
    res.status(400).json({ error: 'Email is required' })
    return
  }

  // Check if password exists
  if (!password) {
    res.status(400).json({ error: 'Password is required' })
    return
  }

  // Check email with regex
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400).json({ error: 'Invalid email' })
    return
  }

  // Check if password have at least 8 characters
  if (password.lenght < 8) {
    res.status(400).json({ error: 'Password must have at least 8 characters' })
    return
  }

  next()
}
