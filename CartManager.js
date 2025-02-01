import fs from "fs"
class CartManager{
    constructor(pathFile){
        this.pathFile=pathFile;
    }
    /* 
    Metodos:
    addCart
    getCartByID
    addProductByID
    */
    addCart=async(products)=>{
        try {
            
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
            const data = JSON.parse(fileData);
    
            
            if (!Array.isArray(products) || products.length === 0) {
                throw new Error("Todos los campos son obligatorios excepto thumbnails.");
            }

            const newID = data.length > 0 ?  Math.max(...data.map(p => p.id)) + 1 : 1;

            const newCart = {
                id: newID,
                products
            };
    
            data.push(newCart);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
    
            return data;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    getCartByID=async(cid)=>{
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8")
            const data= JSON.parse(fileData);
            const cartID= data.find((c)=>c.id===cid)
            return cartID || null;
        } catch (error) {
            throw new Error(`Error al leer el archivo de productos: ${error.message}`)
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
            const data = JSON.parse(fileData);
            const cartIndex = data.findIndex(cart => cart.id === parseInt(cid));
    
            if (cartIndex === -1) {
                throw new Error("Carrito no encontrado");
            }
    
            const cart = data[cartIndex];
    
            const existingProduct = cart.products.findIndex(p => p.id === parseInt(pid));
    
            if (existingProduct === -1) {
                cart.products.push({ id: parseInt(pid), quantity: 1 });
            } else {
                cart.products[existingProduct].quantity += 1;
            }
    
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
    
            return cart;  
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
        }
    };
}
export default CartManager;