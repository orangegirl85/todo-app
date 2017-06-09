const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
const renderer = require('vue-server-renderer').createBundleRenderer(code)
const index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')
const app = express()


app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getCurrentTodo = () => {
    return Promise.resolve([{
        title: 'Lala 1',
        id: 1,
        project: 'Lsass',
        done: false
    }])
}

require('./server/routes')(app)

app.get('/todo', (req, res) => {
    getCurrentTodo().then((todo) => {
        res.json(todo)
    }, (err) => {
        console.error(err)
        res.sendStatus(500)
    })
})

app.get('*', (req, res) => {
    getCurrentTodo().then((todo) => {
        const store = { todo }

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

// app.get('*', (req, res) => {
//     // const store = {todos: [{
//     //     title: 'Todo A',
//     //     project: 'Project A',
//     //     done: false
//     // }]}
//
//     renderer.renderToString(
//         {url: req.url},
//         (err, html) => {
//             if (err) {
//                 console.log(err)
//                 return res.sendStatus(500)
//             }
//             console.log(html)
//             res.send(index.replace('<div id=app></div>', html))
//         }
//     )
// })


// const getCurrentUser = () => {
//     return Promise.resolve({
//         username: 'acoshift',
//         id: 1
//     })
// }
//
// app.use('/static', express.static(path.join(__dirname, './dist/static')))
//
// app.get('/me', (req, res) => {
//   getCurrentUser().then((currentUser) => {
//     res.json(currentUser)
//   }, (err) => {
//     console.error(err)
//     res.sendStatus(500)
//   })
// })
//
// app.get('*', (req, res) => {
//   getCurrentUser().then((currentUser) => {
//     const store = { currentUser }
//
//     renderer.renderToString(
//       { url: req.url, store },
//       (err, html) => {
//         if (err) {
//           console.log(err)
//           return res.sendStatus(500)
//         }
//         res.send(index.replace('<div id=app></div>', html))
//       }
//     )
//   })
// })

app.listen(8080)
