const express = require('express');
// http = require('http');
// const HttpStatus = require('http-status');
const bodyParser = require('body-parser');
// const cors = require("cors");
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

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




console.log("Main index load");

const server = app.listen(3000, () => {
    console.log('Express server listening on port 3000 in development mode');
});

module.exports = server;
