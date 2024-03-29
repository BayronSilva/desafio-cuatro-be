const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter =require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Módulo express-handlebars
const exphbs = require("express-handlebars");

//Configuración control de plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.render("index");
})

//Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})