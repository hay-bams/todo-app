/* eslint-disable class-methods-use-this */
import db from '../db/db';
import models from '../models';

class TodosController {
  getAllTodos(req, res) {
    models.Todo.findAll()
      .then(todos => res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos,
      }));
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    models.Todo.findById(id)
      .then((todo) => {
        if (todo) {
          return res.status(200).send({
            success: 'true',
            message: 'todo retrieved successfully',
            todo,
          });
        }
        return res.status(404).send({
          success: 'false',
          message: 'todo does not exist',
        });
      });
  }

  createTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    }

    models.Todo.findOne({
      where: { title: req.body.title },
    })
      .then((todoFound) => {
        if (todoFound) {
          return res.status(403).send({
            success: 'true',
            message: 'A todo with that title exist already',
          });
        }

        const todo = {
          title: req.body.title,
        };
        models.Todo.create(todo).then(todo => res.status(201).send({
          success: 'true',
          message: 'todo added successfully',
          todo,
        }));
      });
  }

  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      newTodo,
    });
  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }
}

const TodoController = new TodosController();
export default TodoController;
