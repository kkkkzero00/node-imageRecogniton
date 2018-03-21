var express = require('express');

var uploadImg = require('./routes/uploadImg');
var testUrl = require('./routes/test');

const apiRouter = express.Router()


apiRouter
    .use('/uploadImg', uploadImg)
    .use('/test',testUrl);

module.exports = apiRouter;