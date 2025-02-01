import express from "express";
import CartManager from "../CartManager.js";

const cartRouter=express.Router();
const cartManager= new CartManager("./data/carts.json");

cartRouter.post("/", async (req, res)=>{
    try {
        const { products=[] } = req.body;
        const addCart= await cartManager.addCart(products)
        res.status(201).send(addCart)
    } catch (error) {
        res.status(400).send({mesagge:"No se encuentra el archivo o datos inválidos."})
        console.log(error);
    }
});

cartRouter.get("/:cid", async (req, res)=>{
    try {
        const { cid } = req.params;
        const getProductsCart= await cartManager.getCartByID(parseInt(cid))
        res.status(201).send(getProductsCart)
    } catch (error) {
        res.status(400).send({mesagge:"No se encuentra el archivo o datos inválidos."})
        console.log(error);
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;  
        const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));

        if (!cart) {
            return res.status(404).send({ message: "Carrito no encontrado." });
        }
        res.status(200).send(cart);
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).send({ message: "Error al agregar el producto al carrito.", error: error.message });
    }
});





export default cartRouter;