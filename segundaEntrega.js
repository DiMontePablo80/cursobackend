class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;

    }
}

class ProductManager {

    productList = []

    async traerDeApi() {
        const fs = require('fs')
        let cont = 0
        try {
            const lista = await fs.promises.readFile('./listaProductos.json')
            const listajs = JSON.parse(lista)
            listajs.forEach(element => {
                const nuevoProd = new Product(element.title, element.description, element.price, element.thumbnail, element.code, element.stock, element.id = cont)
                this.addProducts(nuevoProd)
                cont++
            })
            this.guardarData()
        } catch (error) {
            console.log(error)
        }
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
        producto ? console.log("el codigo se encuentra en lista") :
            this.productList.push(codProd)
    }

    isInList(codProd) {
        return this.productList.some((p) => p.code == codProd.code)
    }
    getProducts() {
        const fs = require('fs')
        fs.promises.readFile('./data/listaGuardada.json')
            .then((resp) => resp.JSON.parse(resp))
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
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

    buscarXId(productId) {
        return this.productList.find((prod) => prod.id == productId)
    }
}
// menu principal
const mp = new ProductManager()
mp.traerDeApi()
module.exports = mp;