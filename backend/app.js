require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected!');
});

const users = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true 
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const IN_PROD = process.env.NODE_ENV === 'production';

app.use(session({
	name: process.env.SESS_NAME,
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESS_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60 * 2,
		sameSite: true,
		secure: IN_PROD
	}
}));

app.use('/users', users);

app.use('/', (req, res, next) => {
	const { userId } = req.session;
	if (userId) console.log('user id:', userId);
	res.json({ isValidateSess: userId });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const PORT = 6000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
