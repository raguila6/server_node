import  config from './utils/config'

import express from 'express'

import logger from './utils/logger'

const app = express()

app.use(logger.middleware)

app.get('/', (req,res) => {
    logger.log.info("Test")
  res.send({ msg: 'Hello There' })
})

app.listen(config.port)
