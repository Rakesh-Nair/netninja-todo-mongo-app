let express = require('express')
let todoController = require('./controllers/todoController')

let app = express()

//set up template engine
app.set('view engine', 'ejs')   // set to ejs templates

//static files
app.use(express.static('./public'))     // to get the css file, you would now only need ./assets/styles.css, and not the public also

//fire off controllers
todoController(app)     // this todoController is in is an exported function. we pass in app here so that it is available to the todoController.js file

//listen to port
app.listen(3000)
console.log('listening on port 3000')
