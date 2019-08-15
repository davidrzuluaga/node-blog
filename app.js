// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRoutes from './server/routes/main';
import userRoutes from './server/routes/users';
require('dotenv').config();

require('./server/models/Users');
require('./config/passport');

const cors = require('cors');
const session = require('express-session');
const path = require('path');
const errorHandler = require('errorhandler');

// const isProduction = process.env.NODE_ENV === 'production';
// set up port
const port = 3000;
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use('/api/', mainRoutes);

// if(!isProduction) {
//   app.use(errorHandler());
// }

mongoose.connect(process.env.DB_CONN || 'mongodb+srv://davidrzuluaga:Ilikethep00l@cluster0-knyoc.mongodb.net/test?retryWrites=true&w=majority')
.then(()=> {
  console.log('Database connected');
})
.catch((error)=> {
  console.log('Error connecting to database');
});
mongoose.set('debug', true);

// if(!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project Support',
  });
});

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});