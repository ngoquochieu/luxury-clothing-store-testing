const express = require('express');
const homeRouter = require('./home');
const itemsRouter = require('./items');
const actionRouter = require('./action');
function route(app) {
    app.use('/action', actionRouter);
    app.use('/items', itemsRouter);
    app.use('/', homeRouter);
}

module.exports = route;
