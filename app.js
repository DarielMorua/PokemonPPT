var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
const pokemonRouter = require('./routes/pokemon.js')
const pokemonsRouter = require('./routes/pokemons.js')



var app = express();
const gameRouter = require('./routes/game.js')
const mongoose= require('mongoose')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemon', pokemonRouter);
app.use('/pokemons', pokemonsRouter);

app.use('/game',gameRouter)




const uri = "mongodb+srv://Dariel:cacaloca123@cluster1.hoaak.mongodb.net/Cluster1?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB via Mongoose!");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;