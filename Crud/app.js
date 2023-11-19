const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemController = require('./controller/itemController');
require('dotenv').config();
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/get',itemController.authorize,itemController.getItem);
app.post('/post',itemController.createItem);
app.delete('/delete/:id',itemController.authorize,itemController.deleteItem);
app.put('/update/:id',itemController.authorize,itemController.updateItem);
app.post('/login',itemController.loginItem);


app.listen(port, () => {
    console.log("server is started");
});
