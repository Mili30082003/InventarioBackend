require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => console.log("Conectado a Mongo"))
  .catch((error) => console.log(error.message));
