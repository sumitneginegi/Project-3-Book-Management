const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');

const mongoose = require('mongoose');
const app = express();
const multer= require("multer");
const { AppConfig } = require('aws-sdk');

app.use(bodyParser.json());
app.use(multer().any());

mongoose.connect("mongodb+srv://sumitnegi:7KtRrUCkTMIMREOm@cluster0.diszcfl.mongodb.net/group5Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(3000, function () {
    console.log('Express app running on port ' + ( 3000))
});