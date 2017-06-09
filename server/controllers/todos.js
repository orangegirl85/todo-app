const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

// const fs = require('fs')
// const path = require('path')
// const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
// const renderer = require('vue-server-renderer').createBundleRenderer(code)
// const index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
        project: req.body.project
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Todo
      .findAll({
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
        order: [
          ['createdAt', 'DESC'],
         // [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((todos) => {
        res.status(200).send(todos)
        //   const store = { todo: todos }
        //
        //   renderer.renderToString(
        //       { url: req.url, store },
        //       (err, html) => {
        //           if (err) {
        //               console.log(err)
        //               return res.sendStatus(500)
        //           }
        //           // console.log(html)
        //           res.send(index.replace('<div id=app></div>', html))
        //       }
        //   )
      })
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
              project: req.body.project || todo.project,
              done: req.body.done || todo.done
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
