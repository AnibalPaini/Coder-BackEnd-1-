import fs from "fs"

class ProductManager{


    constructor(pathFile){
        this.pathFile=pathFile;
    }

    /* Metodos: 
    getProduct
    getProductByID 
    addProduct
    setProductByID (editar producto a traves del id)
    deleteProductById
    */

    getProduct=async()=>{
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8")
            const data= JSON.parse(fileData);
            return data;
        } catch (error) {
            throw new Error(`Error al leer el archivo de productos: ${error.message}`)
        }
    }

    getProductByID=async(pid)=>{
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8")
            const data= JSON.parse(fileData);
            let productID= data.find((p)=>p.id===pid)
            return productID || null;
        } catch (error) {
            throw new Error(`Error al leer el archivo de productos: ${error.message}`)
        }
    }

    postProduct = async ({title, description, code, price, status = true, stock, category, thumbnails = []}) => {
        try {
            
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
            const data = JSON.parse(fileData);
    
            
            if (!title || !description || !code || price === undefined || stock === undefined || !category) {
                throw new Error("Todos los campos son obligatorios excepto thumbnails.");
            }

            const newID = data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1;

            const newProduct = {
                id: newID,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };
    
            data.push(newProduct);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
    
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    };

    editProduct=async(pid,title, description, code, price, status = true, stock, category, thumbnails)=>{
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8")
            const data= JSON.parse(fileData);
            const index = data.findIndex((p)=>p.id===pid);
            if (index===-1) {
                throw new Error("ID no existente");
            }

            data[index]={
                id:pid,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2))

            return data[index];
        } catch (error) {
            throw new Error(`Error al leer el archivo de productos: ${error.message}`)
        }
    }

    deleteProduct = async (pid) => {
        try {
            const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
            const data = JSON.parse(fileData);
    
            const index = data.findIndex((p) => String(p.id) === String(pid));
    
            if (index === -1) {
                throw new Error("ID no existente");
            }
    
            const dataFiltrada = data.filter((d) => String(d.id) !== String(pid));
    
            await fs.promises.writeFile(this.pathFile, JSON.stringify(dataFiltrada, null, 2));
    
            return dataFiltrada;
        } catch (error) {
            throw new Error(`Error al leer el archivo de productos: ${error.message}`);
        }
    };

}
export default ProductManager;