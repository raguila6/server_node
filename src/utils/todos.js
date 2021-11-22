import logger from "./logger"
import Joi from "joi"

import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()



const todoSchema = Joi.object({
    text: Joi.string().min(10).required(),
    completed: Joi.boolean().required(),
})

const idSchema = Joi.number().integer().positive().required()



export const getTodos = async (completed = null) => {

    if (completed === null) {
    logger.log.success('Getting  all Todos')
    return await db.Todos.findMany()
    } 
        logger.log.success('Getting completion todos')

        const isCompleted = completed === 'true' ? true : false
        return await db.Todos.findMany({
            where : {
                completed: isCompleted,
            },
        }) 
    
}

export const getTodo =  async (id) =>{

    logger.log.info(`Validating id:  ${id}`)
    const {error, value} = idSchema.validate(id)

    if (error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error}
    }


    logger.log.success(`Getting todo with id: ${id}`)
    return await db.todos.findUnique({
        where : {
            id: value,
        },
    })
}

export const addTodos = async (todo) => {
    logger.log.info(`Validating ${todo}`)
    const {error} = todoSchema.validate(todo)

    if (error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error, value}
    }

    logger.log.success(`Validated: ${todo} to add` )
    
    const newTodo = await db.Todos.create({
        data: {
            ...value,
        },
        select: {
            id: true,
            text: true, 
            completed: true,
        },
    })

    return {newTodo}
}

export const updateTodo = async(id,todo) =>{
    logger.log.info(`Validating ${todo} for update`)
    const {error: todoError, value: todoValue} = todoSchema.validate(todo)

    if (todoError){
        logger.log.error(new Error(`Validation error: ${todoError.message}`))
        return {todoError}
    }

    logger.log.info(`Validating id:  ${id}`)
    const {error: idError, value: idValue} = idSchema.validate(id)

    if (idError){
        logger.log.error(new Error(`Validation error: ${idError.message}`))
        return {idError}
    }

    logger.log.success(`Validated tod and Id `)
    
    const updatedTodo = await db.todos.update({
        where: {
            id: idValue,
        },
        data:{
            id: true,
            text: true,
            completed: true,
        },
    })

    return {updatedTodo}

    
}