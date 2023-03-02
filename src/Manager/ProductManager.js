
import fs from "fs"

class ProductManager {
    #acumId = 0
    #path = ""

    constructor(path) {
        this.#path = path
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(products)
        } catch {
            return []
        }
    }

    async getIdNumber(){
        let products = await this.getProducts()
        
        let ids = products.map( p => p.id)
        
        let higherId = Math.max(...ids);
        if (higherId === -Infinity) {
          return 0;
        } else {
          return ++higherId;
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category) {

        try {
            
        let higherId = await this.getIdNumber()

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: higherId,
            status: status,
            category: category,
        }

        let products = await this.getProducts()
        let verify = Object.values(product)
        let sameCode = products.find(prod => prod.code === product.code)

        if (!verify) {
            throw new Error(`El producto ${product.title} NO ha sido cargado, debe completar todos los datos.`)
        }
        if (sameCode) {
            throw new Error(`El producto ${product.title} NO ha sido cargado ya que la propiedad "code" está repetida, ${sameCode.title} tiene el mismo valor.`)
        }

        products = [...products, product]
        console.log(`${product.title} cargado correctamente.`)
        await fs.promises.writeFile(this.#path, JSON.stringify(products))
        } catch (err) {
                 throw new Error(err)   
        }
    }
        // Actualizacion de UpdateProduct .
    async updateProduct(id, data) {
        let products = await this.getProducts()

        const updateProducts = products.map((p) => {
            if (p.id === id) {
                return {
                    ...p,
                    ...data,
                    id,
                };
            }
            return p;
        })

        await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts))
        console.log('Modificación realizada con éxito.')
    }

    async getProductById(id) {
        const products = await this.getProducts()
        const productId = products.find(product => product.id == id)
        return productId === undefined ? [{Error:"NOT FOUND"}] : productId
    }

    async deleteProduct(id) {
        let products = await this.getProducts()
        let newProducts = products.filter(prods => prods.id !== id)
        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts))
        console.log('Producto eliminado con éxito')
    }

}

export default ProductManager

 //async function main(){
   //  const manager = new ProductManager('./products.json')
     // await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
      //await manager.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen2", "sabc1234", 25)
//      await manager.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen3", "aabc1234", 25)
//      await manager.addProduct("producto prueba4", "Este es un producto prueba4", 200, "Sin imagen4", "gabc1234", 25)
//      await manager.deleteProduct(1);
//      await manager.updateProduct(2,{title:"producto prueba 2"});
//}

 //main()

