const express = require('express');
const homeRouter = require('./home');

function route(app) {
    app.use('/', homeRouter);
}

module.exports = route;