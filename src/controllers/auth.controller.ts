import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'
import User from '../models/User'

export const loginHandler = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
}

export const registerHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Create user, encrypt password and save to database
  const newUser = new User({
    email,
    password: User.encryptPassword(password),
  })

  const savedUser = await newUser.save()

  // Create jsonwebtoken
  const token = jwt.sign({ id: savedUser._id }, PRIVATE_KEY, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  })

  res.status(200).json({ token })
}
