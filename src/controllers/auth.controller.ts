import { type Request, type Response } from 'express'
import User from '../models/User'
import { createCookie } from '../libs/cookie'

export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // If user not found
  if (user == null) {
    res.status(404).json({ error: 'User does not exist' })
    return
  }

  // If wrong password
  if (!User.comparePassword(password, user.password)) {
    res.status(404).json({ error: 'Wrong password' })
    return
  }

  // Set cookie
  const cookie = createCookie(user._id)

  res.setHeader('Set-Cookie', cookie)
  res.status(200).end()
}

export const registerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body

  // Create user and encrypt password
  const newUser = new User({
    email,
    password: User.encryptPassword(password),
  })

  // Save to database
  const savedUser = await newUser.save()

  // Set cookie
  const cookie = createCookie(savedUser._id)

  res.setHeader('Set-Cookie', cookie)

  res.status(200).end()
}
