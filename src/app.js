const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
require("./database.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})

//Desafio Chat en el ecommerce: 
const MessageModel = require("./models/message.model.js");
const io = new socket.Server(httpServer);

io.on("connection",  (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", async data => {

        //Guardado mensaje en MongoDB: 
        await MessageModel.create(data);

        //Obtener mensajes de MongoDB y se los paso al cliente: 
        const messages = await MessageModel.find();
        console.log(messages);
        io.sockets.emit("message", messages);
    })
})