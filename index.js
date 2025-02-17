import express from "express";
import productsRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.router.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import http from "http";
import viewsRouter from "./router/views.router.js";
import ProductManager from "./ProductManager.js";

const app=express();
const server = http.createServer(app);
const io = new Server(server)
app.use(express.json())//Habilitamos el ervidor para poder hacer post de json
app.use(express.urlencoded({extended:true}))//Permite enviar datos a traves de un formulario, extended true permite que nos manden otros tipos de datos, no solo texto
app.use(express.static("public"))//carpeta public
const PORT=8080;

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")


//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//websocket
const productManager=new ProductManager("./src/data/products.json")
io.on("connection",(socket)=>{
    console.log("nuevo user");

    socket.on("newProduct", async (productData)=>{
        try {
            const newProduct= await productManager.postProduct(productData);

            io.emit("productAdded", newProduct)
        } catch (error) {
            console.error("Error al añadir producto: "+ error.message);
        }
    })

    socket.on("deleteProduct", async (productId) => {
        try {
            const updatedProducts = await productManager.deleteProduct(productId);
            io.emit("updateProducts", updatedProducts);
        } catch (error) {
            console.error("Error al eliminar producto: " + error.message);
        }
    });

})





server.listen(PORT,()=>console.log("Server iniciado en http://localhost:8080"))