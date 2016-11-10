var bodyParser = require('body-parser')

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'do some coding'}]  // using this var, the data is only stored on the server temporarily... until the server file is restarted.

var urlencodedParser = bodyParser.urlencoded({extended: false})     // gives access to the body of a post request via the req.body param

module.exports = function(app) {        // this is a function that takes app as an arg. this function is called from app.js and passes app into the function here so it can use it as app.get, app.post etc.

    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body)     // from the AJAX call in public/assets/todo-list.js
        console.log(req.body)
        res.json(data)      // returns the above data array to the browser. the AJAX call on success function does a location.reload() page reload causing the page to be re-rendered, and as it now has the new data array it renders that array.
        console.log(data)
    })

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item  // replacing spaces with hyphens so can compare to the params.item which had it's spaces removed also'. If this statement returns true (i.e. the item is not the params.item it is kept in the array). The net result is that the params.item is removed from the array. 
        })
        res.json(data)
    })

}