import dotenv from 'dotenv'

import joi from 'joi'

import logger from './logger'

dotenv.config()

const envSchema = joi.object().keys({
    NODE_ENV: joi
        .string()
        .valid('development', 'production').required(),
    PORT: joi.number().positive().required(),
})
.unknown()

const {value: env, error} = envSchema.preferences({errors:{label: 'key'}}).validate(process.env)

if (error){
    logger.log.error(new Error(`Config validation error: ${error.message}`))
    
}

export default {nodeEnv: env.NODE_ENV, port: env.PORT}


