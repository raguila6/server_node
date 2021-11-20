import { Router } from "express"
import {getTodos, getTodo, addTodos, updateTodo} from '../../utils/todos'
import {NETWORK_AUTHENTICATION_REQUIRED, StatusCodes} from 'http-status-codes'

const router=Router()

router.get('/', (req,res) =>{
    const Todos = getTodos(req.query.completed)
    res.send(Todos)
})

router.get('/:id', (req, res, next) => {
    const todo = getTodo(req.params.id)
    if (todo){
        res.send(todo)
    } else {
        res.status(StatusCodes.NOT_FOUND)
        next(new Error('Not found'))
    }
})

router.post('/', (req,res,next)=> {
    const todo = req.body
    const response = addTodos(todo)
    if (response.error){
        res.status(StatusCodes.BAD_REQUEST)
        next(response.error)
    } else{
        res.status(StatusCodes.CREATED)
        res.send(response.newTodo)
    }
        
})

router.put('/:id', (req, res, next) => {
    const todo = req.body  
    const response = updateTodo(req.params.id, todo)

    if (response.error){
        res.status(StatusCodes.BAD_REQUEST)
        next(response.error)
    } else {
        res.status(StatusCodes.OK)
        res.send(response.updateTodo)
    }
})

export default router