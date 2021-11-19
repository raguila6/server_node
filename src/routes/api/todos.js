import { Router } from "express"

import {getTodos} from '../../utils/todos'

const router=Router()

router.get('/', (req,res) =>{
    const Todos = getTodos()
    res.send(Todos)
})

export default router