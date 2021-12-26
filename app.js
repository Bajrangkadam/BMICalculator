const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const routes = require('./routes');

const app = express();
const APP_PORT = (process.env.PORT || 3000);
const APP_HOST = (process.env.APP_HOST || '127.0.0.1');

app.set('port', APP_PORT);
app.set('host', APP_HOST);

/* Enable files upload */
app.use(fileupload({
  createParentPath: true,
  limits: { 
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}));

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/* Health check API */
app.get('/', (req, res) => {
  res.json({
    app: 'BMI calculator',
    apiVersion: '1.0'
  });
});

/* API Routes */
app.use('/api', routes);

/* Handle Invalid Routes */
app.use((req, res, next) => {
  res.status(404).send({
  status: 'fail',
  error: 'Route not found'
  })
 })

 /* Handle Uncaught Exception */
process.on("uncaughtException", e => {
  console.log(`getting uncaught exception of ${e.message} with ${e.stack}`);
});

 /* Handle Unhandle Rejection */
process.on("unhandledRejection", (e) => {
  console.log(`getting unhandled rejection of ${e.message} with ${e.stack}`);
});

/* Create Server */
app.listen((process.env.PORT || app.get('port')), () => {
  console.log(`Server started at http://${app.get('host')}:${app.get('port')}`);
});