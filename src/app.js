import express, { json } from "express"
import ProductManager from "./Manager/ProductManager.js";
import CartManager from "./Manager/CartManager.js";
import productsRouter from "./Routes/ProductRoute.js";
import cartsRouter from "./Routes/cartRoute.js";

const manager = new ProductManager("./src/Json/Products/products.json");
// await manager.addProduct("Tablero de Madera", "Tablero Ajedrez de madera.", 43000, "thumbail", "code1", 10)
// await manager.addProduct("Tablero de Vinilo", "Tablero Ajedrez de vinilo.", 10000, "thumbail", "code2", 20)
// await manager.addProduct("Tablero Imantado ", "Tablero Ajedrez Imantado.", 69000, "thumbail", "code3", 30)
// await manager.addProduct("Tablero Triple", "Tablero Ajedrez Triple.", 19000, "thumbail", "code4", 40)
const cartManager = new CartManager("./src/Json/Carts/cart.json");

const app = express()
app.use(json())

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(8080, ()=>{
    console.log("Server listening on port 8080.")
})

export {manager, cartManager}
