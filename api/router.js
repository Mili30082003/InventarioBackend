const express = require("express");
const router = express.Router();
const productos = require("../models/productoSchema");

// Endpoint para registrar un nuevo producto
router.post("/register", async (req, res) => {
  const { name, category, size,price, stock } = req.body;

  // Validación de datos
  if (!name || !category || !size || !price || !stock) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  try {
    // Verificar si el producto ya existe
    const preuser = await productos.findOne({ name: name });
    if (preuser) {
      return res.status(409).send("El producto ya existe");
    }

    // Crear y guardar el nuevo producto
    const nuevoProducto = new productos({
      name,
      category,
      size,
      price,
      stock,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).send("Error del servidor");
  }
});


// traer la informacion 
router.get("/getdata", async (req, res) => {
  try {
    const productdata = await productos.find();
    console.log(productdata); // Verifica qué datos están siendo retornados
    res.status(201).json(productdata);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error al obtener los datos del producto" });
  }
});

    
 router.delete("/delete/:id", async(req,res) => {
  try {
        const { id } = req.params;
        const deletedProduct = await productos.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado "});
        }
        res.status(200).json({  message: "Producto eliminado con exito "});
  } catch (error) {

      res.status(500).json({ message: "Error al eliminar el producto ", error});
    
  }
 })

 // Editar producto por ID
 router.put("/update/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const { name, category, size, price, stock } = req.body;

        const updateProduct = await productos.findByIdAndUpdate(
          id,
          { name, category, size, price , stock },
          { new: true } // devuelve el documento actualizado
        );

        if (!updateProduct) {
          return res.status(404).json({ message: "Producto no encontrado "});
        }

        res.status(200).json({ message: "Producto actualizado con exito", updateProduct});
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el producto", error});
    }
 })

 router.put("/updateventas/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body; // Cantidad de productos vendidos

  try {
    const producto = await productos.findById(id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    // Actualizar ventas y stock
    producto.sales += cantidad;
    producto.stock -= cantidad;
    await producto.save();

    res.status(200).json({ message: "Ventas actualizadas correctamente", producto });
  } catch (error) {
    console.error("Error al actualizar ventas:", error);
    res.status(500).json({ message: "Error al actualizar ventas" });
  }
});

module.exports = router;