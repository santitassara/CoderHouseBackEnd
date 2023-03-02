import { manager } from  "../app.js";
import { json, Router } from "express";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", async (req,res) => {
  try{

    const products = await manager.getProducts();
    const {limit} = req.query;

    if (limit) { 
      const productLimit = products.slice(0,limit);
      return res.send({status: "success", payload: productLimit});
    }
    res.send({status: "success", payload: products });
  }catch (err){
    res.status(404).send({status:"error", error: `${err}`})
  }
});

productsRouter.get("/:pid", async (req, res)=>{

  try{
      const {pid} = req.params
      const product = await manager.getProductById(parseInt(pid))
      res.send({status:"success", payload:product})
  } catch(err) {
      res.status(404).send({status:"error", error:`${err}`})
  }
})

productsRouter.post("/", async (req,res)=>{
  try{
      // En el body no envío "thumbail" ni "status", los defino por defecto hasta que tenga que cambiarlo
      const {title, description, price, thumbnail=[], code, stock, status=true, category} = req.body
      await manager.addProduct(title, description, parseInt(price), thumbnail, code, parseInt(stock), status, category)

      res.send({status: "success", payload: req.body})
  }catch(err){
      res.status(404).send({status: "error", error: `${err}`})
  }
})

productsRouter.put("/:pid", async (req, res)=>{
  try{
      const {pid} = req.params
      const id = parseInt(pid)
      await manager.updateProduct(id, req.body)
  
      res.send({status: "success", payload: await manager.getProductById(id)})
  }catch(err){
      res.status(404).send({status: "error", error: `${err}`})
  }
})

productsRouter.delete("/:pid", async(req, res)=>{
  try{
      const {pid} = req.params
      const id = parseInt(pid)
      await manager.deleteProduct(id)

      res.send({status: "success", payload: "Producto eliminado"})
  } catch(err){
      res.status(404).send({status: "error", error: `${err}`})
  }
})

export default productsRouter
