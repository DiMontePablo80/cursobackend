class Carts {
    ListCarts = []

    generarCart(lista) {
        const cont = this.ListCarts.length + 1
        const carrito = {
            id: cont,
            products: lista
        }
        this.addCartsToList(carrito)
        this.guardarCarts(carrito)

    }
    async getCarts() {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./data/listaCarts.json')
            const listajs = JSON.parse(lista)
            return listajs
        } catch (error) {
            console.log(error)
        }
    }

    addCartsToList(cart) {
        this.ListCarts.push(cart)
    }
    guardarCarts(listCarts) {
        const fs = require('fs')
        let jsonCarts = JSON.stringify(this.ListCarts)
        fs.promises.writeFile('./data/listaCarts.json', jsonCarts)
            .then(() => console.log("se guardo de forma exitosa"))
            .catch((error) => console.log(error))
    }
    async getCartById(cartId) {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./data/listaCarts.json')
            const listajs = JSON.parse(lista)
            const find = listajs.find((prod => prod.id == cartId))
            return find

        } catch (error) {
            console.log(error)
        }
    }
    async deleteCart(cartEliminar) {
        let lista = await this.getCarts()
        let indice = lista.findIndex(producto => producto.id == cartEliminar)
        lista.splice(indice, 1)
        const fs = require('fs')
        this.ProductManager.reordenarID(lista)
        const jsonLista = JSON.stringify(lista)
        fs.promises.writeFile('./data/listaCarts.json', jsonLista)
            .then(() => console.log("Carrito se guardo de forma exitosa"))
            .catch((error) => console.log(error))

    }
    async cartInList(cartId) {
        const lista = await this.getCarts()
        return lista.some((c) => c.id == cartId)
    }
    async agregarProductsAlCarrito(cartId, prodId, quantity) {
        const fs = require('fs')
        try {
            const lista = await fs.promises.readFile('./data/listaCarts.json')
            const listajs = JSON.parse(lista)
            listajs.forEach((carrito) => {
                carrito.id == cartId
                if (carrito.products.id == prodId) {
                    carrito.products.quantity += quantity
                } else {
                    carrito.products.push({
                        id: prodId,
                        quantity: quantity
                    })
                }
            })
            this.guardarCarts(listajs)
            console.log(listajs)

        } catch (error) {
            console.log("error")
        }
    }


}
const carts = new Carts
module.exports = carts