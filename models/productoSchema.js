const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category:{
            type:String,
            required: true
        },
        size: {
            type: Number, 
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
        },
        sales : {
            type: Number,
            default: 0
        }
    });

    const productos = new mongoose.model('productos', productoSchema);

    module.exports = productos;