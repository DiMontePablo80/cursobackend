class Product {
    constructor(title, description, price, status = true, thumbnail, code, stock, category, id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = status;
        this.thumbnail = thumbnail;
        this.code = code;
        this.category = category;
        this.stock = stock;

    }
}

class ProductManager {

    productListjs = []
    productList = []

    async traerDeApi() {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./listaProductos.json')
            const listajs = JSON.parse(lista)
            this.productListjs = listajs
            this.generarProductos()
        } catch (error) {
            console.log(error)
        }
    }
    generarProductos() {
        let cont = this.productList.length
        this.productListjs.forEach(element => {
            const nuevoProd = new Product(element.title, element.description, element.price, element.status, element.thumbnail, element.code, element.stock, element.category, element.id = cont)
            this.addProducts(nuevoProd)
            cont++
        })
        this.guardarData()
        this.productListjs = []
    }
    guardarData() {
        const fs = require('fs')
        let jsonData = JSON.stringify(this.productList)
        fs.promises.writeFile('./data/listaGuardada.json', jsonData)
            .then(() => console.log("se guardo de forma exitosa"))
            .catch((error) => console.log(error))
    }
    addProducts(codProd) {
        const producto = this.isInList(codProd)
        producto ? this.agregarStock(codProd) :
            this.productList.push(codProd)
    }
    agregarStock(codProd) {
        this.productList.forEach((prod) => {
            prod.code == codProd
            prod.stock += 1
        })
        console.log("el cod producto existe. se agrego una unidad al stock")
    }
    isInList(codProd) {
        return this.productList.some((p) => p.code == codProd.code)
    }
    async productInList(pId) {
        const lista = await this.getProducts()
        return lista.some((p) => p.id == pId)
    }
    async getProducts() {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./data/listaGuardada.json')
            const listajs = JSON.parse(lista)
            return listajs
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsById(productId) {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./data/listaGuardada.json')
            const listajs = JSON.parse(lista)
            const find = listajs.find((prod => prod.id == productId))
            return find

        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(productoEliminar) {
        let lista = await this.getProducts()
        let indice = lista.findIndex(producto => producto.id == productoEliminar)
        lista.splice(indice, 1) // al borrar e producto se modifica el indice de la lista
        const fs = require('fs')
        this.reordenarID(lista)
        const jsonLista = JSON.stringify(lista)
        fs.promises.writeFile('./data/listaGuardada.json', jsonLista)
            .then(() => console.log("se guardo de forma exitosa"))
            .catch((error) => console.log(error))

    }
    reordenarID(lista) {
        let cont = 0
        lista.forEach((prod) => {
            prod.id = cont
            cont += 1
        })
        return lista
    }
    async buscarYActualizar(id, contenido) {
        let lista = await this.getProducts()
        let indiceProduct = lista.findIndex(producto => producto.id == id)
        let contenidoActualizado = {
            id,
            ...contenido
        }
        lista[indiceProduct] = contenidoActualizado
        const fs = require('fs')
        const jsonLista = JSON.stringify(lista)
        fs.promises.writeFile('./data/listaGuardada.json', jsonLista)
            .then(() => console.log("se guardo de forma exitosa"))
            .catch((error) => console.log(error))

    }
}


// menu principal
const mp = new ProductManager()
mp.traerDeApi()
module.exports = mp