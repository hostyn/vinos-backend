import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI || ''
export const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
