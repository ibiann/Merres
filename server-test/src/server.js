import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { connectDB } from './config/mongodb'
import { env } from './config/environment'
import { apiV1 } from './routes/v1'

connectDB()
  .then(() => console.log('Connected successfully!!!'))
  .then(() => rootServer())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

const rootServer = () => {
  const app = express()

  app.use(cors(corsOptions))

  // enable req.body data
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb' }))

  // use api v1
  app.use('/v1', apiV1)

  connectDB().catch(console.log)

  app.listen(env.APP_PORT, () => {
    console.log(`hello, this is ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}

