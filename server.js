import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';
import config from './config';


dotenv.config({ silent: true });

// Initialize http server
const app = express();

// log http requests
app.use(morgan('dev'));

// enable / disable cors
app.use(cors());

// Database connection
app.use((req, res, next) => {
  global.connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.schema,
  });
  global.connection.connect();
  next();
});

// parse http responses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Team 15 project');
});
app.use('/', router);

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
