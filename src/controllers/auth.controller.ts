import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'
import User from '../models/User'

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // If user not found
  if (!user) {
    res.status(404).json({ error: 'Wrong user or password' })
    return
  }

  // If wrong password
  if (!User.comparePassword(password, user.password)) {
    res.status(404).json({ error: 'Wrong user or password' })
    return
  }
  // We use the same response to prevent user enumeration

  // Create jsonwebtoken
  const token = jwt.sign({ id: user._id }, PRIVATE_KEY, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  })

  res.status(200).json({ token })
}

export const registerHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Create user and encrypt password
  const newUser = new User({
    email,
    password: User.encryptPassword(password),
  })

  // Save to database
  const savedUser = await newUser.save()

  // Create jsonwebtoken
  const token = jwt.sign({ id: savedUser._id }, PRIVATE_KEY, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  })

  res.status(200).json({ token })
}
