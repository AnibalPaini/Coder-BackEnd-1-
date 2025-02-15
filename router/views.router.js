import express from "express";
import ProductManager from "../ProductManager.js";

const viewsRouter=express.Router();
const productManager= new ProductManager("./src/data/products.json")

viewsRouter.get("/", async(req, res)=>{
    try {
        const products= await productManager.getProduct();
        res.render("home",{products})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: Error.message})
    }
})
viewsRouter.get("/realtimeproducts", async(req, res)=>{
    try {
        const products= await productManager.getProduct();
        res.render("realtimeproducts",{products})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: Error.message})
    }
})

export default viewsRouter;