import morgan from "morgan"

import consola, { Consola } from 'consola'

const middleware = morgan('dev')
const log = consola

export default {middleware, log}

