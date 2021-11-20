import { nanoid } from "nanoid"
import logger from "./logger"
import Joi from "joi"


const Todos = []

const todoSchema = Joi.object({
    text: Joi.string().min(10).required(),
    completed: Joi.boolean().required(),
})

const baseTodo = {
    id: nanoid(),
    text: 'Test todo',
    completed: false,
}

Todos.push(baseTodo)

export const getTodos = (completed = null) => {

    if (completed === null) {
    logger.log.success('Getting  all Todos')
    return Todos
    } 
        logger.log.success('Getting completion todos')
        const isCompleted = completed === 'true' ? true : false
        return todos.filter(todo => todo.completed === isCompleted)
    
}

export const getTodo = (id) =>{
    logger.log.success(`Getting todo with id: ${id}`)
    return Todos.find((todo) => todo.id === id)
}

export const addTodos = (todo) => {
    logger.log.info(`Validating ${todo}`)
    const {error} = todoSchema.validate(todo)

    if (error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error}
    }

    logger.log.success(`Validated: ${todo} to add` )
    const newTodo = {id: nanoid(), ...todo}
    Todos.push(newTodo)
    return {newTodo}
}

export const updateTodo = (id,todo) =>{
    logger.log.info(`Validating ${todo} for update`)
    const {error} = todoSchema.validate(todo)

    if (error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error}
    }

    logger.log.success(`Validated: ${todo}`)
    const todoIndex = todos.findIndex((t) => t.id === id)
    Todos[todoIndex] = {id, ...todo}
    const updatedTodo = todos[todoIndex]
    return todos[todoIndex]
}