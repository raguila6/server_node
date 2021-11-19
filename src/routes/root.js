import { Router } from 'express'

import logger from '../utils/logger'

const router = Router()

router.get('/', (req, res) => {
  logger.log.success('Test')
  res.send({ msg: 'Hello There' })
})

export default router