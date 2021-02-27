const express = require('express'),
http = require('http');
const HttpStatus = require('http-status');
const bodyParser = require('body-parser');
const cors = require("cors");

const hostname = 'localhost';
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const router = express.Router();


//All Routes
const routes = require('./routes/index');
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = HttpStatus.NOT_FOUND;
    err.log = "not found";
    next(err);
  });
  
  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use((err, req, res, next) => {
    if (err.status === 404) {
        const response = {
            err: 1,
            obj: {},
            msg: "Not found"
        }
        return res.json(response);
    } else {
        const response = {
            err: 1,
            obj: {},
            msg: "Exception occured"
        }
        return res.json(response);
    }
  });