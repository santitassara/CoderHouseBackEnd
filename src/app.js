import ProductManager from "./ProductManager.js";
import express from "express"

const manager = new ProductManager("./products.json")
 await manager.addProduct("Tablero de Madera", "Tablero Ajedrez de madera.", 43000, "thumbail", "code1", 10)
 await manager.addProduct("Tablero de Vinilo", "Tablero Ajedrez de vinilo.", 10000, "thumbail", "code2", 20)
 await manager.addProduct("Tablero Imantado ", "Tablero Ajedrez Imantado.", 69000, "thumbail", "code3", 30)
 await manager.addProduct("Tablero Triple", "Tablero Ajedrez Triple.", 19000, "thumbail", "code4", 40)



const app = express()

app.get("/products", async (req, res)=>{
    
    try{
        const products = await manager.getProducts()
        const {limit} = req.query
    
        if (limit){
            products.length = limit
            return res.send(products)
        }
    
        res.send(products)
    } catch (err){
        res.status(404).send(`${err}`)
    }
})

app.get("/products/:pid", async (req, res)=>{

    try{
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        res.send(product)
    } catch(err) {
        res.status(404).send(`${err}`)
    }
})

app.listen(8080, ()=>{
    console.log("Server listening on port 8080.")
})