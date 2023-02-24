import { config } from 'dotenv'
config()

export const PORT: string = process.env.PORT as string | '3000'
export const MONGODB_URI: string = process.env.MONGODB_URI as string
export const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string
