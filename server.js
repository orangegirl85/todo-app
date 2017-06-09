const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
const renderer = require('vue-server-renderer').createBundleRenderer(code)
const index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')
const todosController = require(path.join(__dirname,'./server/controllers')).todos;
const Todo = require(path.join(__dirname,'./server/models')).Todo
const app = express()


app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/routes')(app)

app.get('*', (req, res) => {

    Todo.findAll({ order: [ ['createdAt', 'DESC']], raw: true}).then((ttt) => {
        const store = { todos: ttt }

        renderer.renderToString(
            { url: req.url, store },
            (err, html) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                // console.log(html)
                res.send(index.replace('<div id=app></div>', html))
            }
        )
    })
})

app.listen(8080)
