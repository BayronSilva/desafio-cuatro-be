const ProductModel = require("../models/product.model.js");

class ProductManager {

    async addProduct({title, description, price, img, code, stock, category, thumbnails}) {
        try {
            if(!title|| !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return; 
            }

            const existeProducto = await ProductModel.findOne({code: code});

            if(existeProducto) {
                console.log("El código debe ser unico");
                return;
            }

            const newProduct = new ProductModel({
                title, 
                description, 
                price, 
                img, 
                code,
                stock, 
                category, 
                status: true, 
                thumbnails: thumbnails || []
            });

            await newProduct.save(); 

        } catch (error) {
            console.log("Error al agregar un producto", error); 
            throw error; 
        }
    }

    async getProducts() {
        try {
            const products = await ProductModel.find(); 
            return products;
        } catch (error) {
            console.log("Error al recuperar los productos", error); 
            throw error; 
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);
            if(!product) {
                console.log("Producto no encontrado");
                return null; 
            }

            console.log("Producto encontrado");
            return product;
        } catch (error) {
            console.log("Error al recuperar producto por ID", error); 
            throw error; 
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const updateProduct =  await ProductModel.findByIdAndUpdate(id, productoActualizado);
            if(!updateProduct) {
                console.log("Producto no encontrado");
                return null; 
            }
            console.log("Producto actualizado");
            return updateProduct;

        } catch (error) {
            console.log("Error al actualizar producto por ID", error); 
            throw error; 
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id);

            if(!deleteProduct) {
                console.log("Producto no encontrado");
                return null; 
            }
            console.log("Producto eliminado");
        } catch (error) {
            console.log("Error eliminar producto por ID", error); 
            throw error; 
        }
    }
}

module.exports = ProductManager;