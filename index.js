import express from "express";
import productsRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.router.js";

const app=express();
app.use(express.json())//Habilitamos el ervidor para poder hacer post de json
app.use(express.urlencoded({extended:true}))//Permite enviar datos a traves de un formulario, extended true permite que nos manden otros tipos de datos, no solo texto


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);



app.listen(8080,()=>console.log("Server iniciado en http://localhost:8080"))