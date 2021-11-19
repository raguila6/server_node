import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import  config from './utils/config'
import logger from './utils/logger'



const app = express()


app.use(logger.middleware)
app.use(helmet())
app.use(cors({origin: config.origin,}))

app.get('/', (req,res) => {
    logger.log.info("Test")
  res.send({ msg: 'Hello There' })
})

app.listen(config.port)
