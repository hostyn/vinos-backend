import app from './app'
import './database'
import './libs/initialSetup'
import { PORT } from './config'

app.listen(PORT)

console.log('Server listening on port', PORT)
