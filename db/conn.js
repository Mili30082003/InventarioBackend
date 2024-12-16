const mongoose = require('mongoose')

const DB = "mongodb+srv://mili-mb:Qop87AEmHES8lWEe@cluster0.aony1.mongodb.net/Inventario"

mongoose.connect(DB).then(() => console.log("Conectado a Mongo")).catch((error) => console.log(error.message));