const express = require('express');
const cors = require('cors');
const routes = require('./routers');


const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);
module.exports = app;