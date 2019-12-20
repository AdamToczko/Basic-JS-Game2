// added from https://expressjs.com/en/starter/hello-world.html
// we are pulling express module 
// and instatiate express and assign to app
// basic server setup
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))