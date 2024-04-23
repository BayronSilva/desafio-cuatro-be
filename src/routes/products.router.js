const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager-db.js");
const productManager = new ProductManager();

// Obtener todos los productos del JSON
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

// Buscar producto por ID
// router.get("/products/:pid", async (req, res) => {
//     const id = req.params.pid;
//     try {
//         const product = await productManager.getProductById(parseInt(id));
//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ status: false, msg: "Producto no encontrado" });
//         }
//     } catch (error) {
//         console.error("Error al obtener producto:", error);
//         res.status(500).json({ status: false, msg: "Error interno del servidor" });
//     }
// });
router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

// Agregar nuevo producto
// router.post("/products", async (req, res) => {
//     const newProduct = req.body;
//     try {
//         const respuesta = await productManager.addProduct(newProduct);
//         if (respuesta.status) {
//             res.status(201).json({ status: true, msg: "Producto agregado correctamente" });
//         } else {
//             res.status(400).json({ status: false, msg: respuesta.msg });
//         }
//     } catch (error) {
//         console.error("Error al agregar producto:", error);
//         res.status(500).json({ status: false, msg: "Error interno del servidor" });
//     }
// });
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado exitosamente"
        });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

// Actualizar por ID
// router.put("/products/:pid", async (req, res) => {
//     const id = req.params.pid;
//     const productoActualizado = req.body;
//     try {
//         const respuesta = await productManager.updateProduct(parseInt(id), productoActualizado);
//         if (respuesta.status) {
//             res.json({ status: true, msg: "Producto actualizado correctamente" });
//         } else {
//             res.status(400).json({ status: false, msg: respuesta.msg });
//         }
//     } catch (error) {
//         console.error("Error al actualizar producto:", error);
//         res.status(500).json({ status: false, msg: "Error interno del servidor" });
//     }
// });
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try {
        await productManager.updateProduct(id, productoActualizado);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

// Eliminar producto
// router.delete("/products/:pid", async (req, res) => {
//     const id = req.params.pid;
//     try {
//         const respuesta = await productManager.deleteProduct(parseInt(id));
//         if (respuesta.status) {
//             res.json({ status: true, msg: "Producto eliminado correctamente" });
//         } else {
//             res.status(400).json({ status: false, msg: respuesta.msg });
//         }
//     } catch (error) {
//         console.error("Error al eliminar producto:", error);
//         res.status(500).json({ status: false, msg: "Error interno del servidor" });
//     }
// });
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

module.exports = router;
