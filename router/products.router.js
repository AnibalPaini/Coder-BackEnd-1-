import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter=express.Router();
const productManager= new ProductManager("./src/data/products.json");

productsRouter.get("/", async (req, res)=>{
    try {
        const data= await productManager.getProduct()
        res.status(200).send(data)
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send({mesagge:"No se encuentra el archivo"})
    }
});

productsRouter.get("/:pid", async(req, res)=>{
    try {
        const {pid}=req.params;
        const productID= await productManager.getProductByID(parseInt(pid))
        if (!productID){
            return res.status(404).send({mesagge:"No se encuentra el producto"})
        }else{
            res.status(200).send(productID)
        }
    } catch (error) {
        res.status(500).send({mesagge:"No se encuentra el archivo"})
    }
});

productsRouter.post("/", async (req, res)=>{
    try {
        const { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body;
        const newProduct= await productManager.postProduct(title, description, code, price, status, stock, category, thumbnails)
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send({mesagge:"No se encuentra el archivo o datos inválidos."})
    }
});

productsRouter.put("/:pid", async (req, res)=>{
    try {
        const { pid }=req.params;
        const { title, description, code, price, status, stock, category, thumbnails=[] } = req.body;
        const data= await productManager.editProduct(parseInt(pid), title, description, code, price, status, stock, category, thumbnails)
        res.status(200).send(data);
    } catch (error) {
        console.error("Error al actualizar producto:", error); // Aquí se ve el error completo
        res.status(500).send({ message: "Error al intentar actualizar el producto.", error: error.message });
    }
});

productsRouter.delete("/:pid", async(req, res)=>{
    try {
        const {pid}=req.params;
        const data= await productManager.deleteProduct(parseInt(pid))
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({mesagge:"No se encuentra el archivo"})
    }
});



export default productsRouter;