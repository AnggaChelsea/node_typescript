import { Request, Response } from 'express';

import TodoModel from '../../models/todo'
import { Todo } from '../../types/todo'

export const getTodos = async (req:Request, res:Response)=>{
  const todos: Todo[] = await TodoModel.find()
  res.status(200).json({todos})
}

export const getTodoId = async (req:Request, res:Response)=>{
  await TodoModel.findById(req.params.id, (err,result)=>{
    if(err){
      res.status(403).json({error:err})
    }
    else{
      res.status(200).json({result})
    }
  })
} 

export const addTodo = async (req:Request, res:Response):Promise<void>=>{
  const body : Pick<Todo, 'title' | 'status'> = req.body
  if(!body.title || !body.status){
    res.status(401).json({status:401, message:'todo tittle or status nothing here'})
    return
  }
  const newTodoModel = new TodoModel({
    title:body.title,
    status:body.status
  })
  const newTodo = await newTodoModel.save()
  const updateAllTodoAfterSave = await TodoModel.find()

  res.status(201).json({
    message:'todo succes',
    addedTodo: newTodo,
    updateAllTodoAfterSave:updateAllTodoAfterSave
  })
}