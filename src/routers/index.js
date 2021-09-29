const express = require('express');
const homeRouter = require('./home');
const itemsRouter = require('./items');

function route(app) {
    app.use('/items', itemsRouter)
    app.use('/', homeRouter);
}

module.exports = route;
