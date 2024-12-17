require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require("./db/conn")
const productos = require("./models/productoSchema");
const cors = require("cors");
const router = require('./routes/router');



const port = 5000;


app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
 