import { nanoid } from "nanoid"

const Todos = []

const baseTodo = {
    id: nanoid(),
    text: 'Test todo',
    completed: false,
}

Todos.push(baseTodo)

export const getTodos = () => {
    return Todos
}

export const addTodos = (todo) => {
    todos.push(todo)
}