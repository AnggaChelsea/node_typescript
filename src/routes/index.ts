import { Router } from 'express'
import bodyParser from 'body-parser'
import { getTodos, getTodoId, addTodo } from '../controllers/todos'

const router = Router()
const jsonParser = bodyParser.json()

router.get('/api/todos', getTodos)

router.get('/api/todos/:id', getTodoId)

router.post('/api/add-todo',jsonParser, addTodo)

// router.put('/api/update-todo/:id', jsonParser, updatedTodo)

// router.delete('/api/remove-todo/:id',jsonParser, removeTodo)

export default router