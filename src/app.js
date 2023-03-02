import express, { json } from "express"
import ProductManager from "./Manager/ProductManager.js";
import CartManager from "./Manager/CartManager.js";
import productsRouter from "./Routes/ProductRoute.js";
import cartsRouter from "./Routes/cartRoute.js";

const manager = new ProductManager("./src/Json/Products/products.json");
const cartManager = new CartManager("./src/Json/Carts/cart.json");

const app = express()
app.use(json())

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(8080, ()=>{
    console.log("Server listening on port 8080.")
})

export {manager, cartManager}
