require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');



//Middlewares
app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Estatics
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000);
console.log('Servidor escuchando...');

