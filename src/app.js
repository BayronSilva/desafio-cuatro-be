const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const productsRouter =require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Configuración control de plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})

//Con socket.io
const io = socket(httpServer);

//Obtener array productos
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    //Enviamos el array de productos al cliente: 
    socket.emit("productos", await productManager.getProducts());

    //Recibimos el evento "eliminarProducto" desde el cliente: 
    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        //Enviamos el array de productos actualizados: 
        socket.emit("productos", await productManager.getProducts());
    })

    //Recibimos el evento "agregarProducto" desde el cliente: 
    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        socket.emit("productos", await productManager.getProducts());
    })
})
