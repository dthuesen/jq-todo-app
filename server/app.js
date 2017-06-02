let express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/todo_app");


/** MIDDLEWARE STACK SETUP / CONFIGURATION */

// Each app.use() is a middleware layer and will be called with every request
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// CORS MIDDLEWARE - Cross Origin Resource Sharing
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

var todoSchema = new mongoose.Schema({
  text: String,
});

var Todo = mongoose.model("Todo", todoSchema);



/** ESCAPING ANY SPECIAL CHARACTER WITH A BACKSLASH */

function escapeRegex(text) {
  console.log('incoming text: ', text);
  const escapedText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  console.log('escaped text: ', escapedText)
  return escapedText;
}



/** ROUTES */

app.get("/todos", function(req, res){
  
  if(req.query.keyword) { // if there's a query string called keyword then..
    const regex = new RegExp(escapeRegex(req.query.keyword), 'gi'); //set the const regex equal to new regex from the keyword pulled from from query string
    console.log('escaped text: ', regex);
    
    Todo.find({text: regex}, function(err, todos) {
      if(err){
        console.log(err);
      } else {
        res.json(todos); // send back the todos found as json
      } 
    });
  } else {
    /** IF THERE WASN'T A QUERY STRING KEYWORD THEN... */
    Todo.find({}, function(err, todos){ // query the db for all todos
      if(err){
        console.log(err);
      } else {
          res.json(todos); // send back all todos as JSON
      }
    });
  }
  
  
});


app.post("/todos", function(req, res){
 req.body.todo.text = req.sanitize(req.body.todo.text);
 let formData = req.body.todo;
 Todo.create(formData, function(err, newTodo){
    if(err){
      res.render("new");
    } else {
      res.json(newTodo);
    }
  });
});


app.put("/todos/:id", function(req, res){
 Todo.findByIdAndUpdate(req.params.id, req.body.todo, {new: true}, function(err, todo){
   if(err){
     console.log(err);
   } else {
     res.json(todo);
   }
 });
});

app.delete("/todos/:id", function(req, res){
 Todo.findByIdAndRemove(req.params.id, function(err, todo){
   if(err){
     console.log(err);
   } else {
     res.json(todo);
   }
 }); 
});


app.listen(3000, function() {
  console.log('Server running on port 3000');
});