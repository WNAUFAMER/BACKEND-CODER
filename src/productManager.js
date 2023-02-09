const fs = require('fs');


class ProductManager {
        #ruta = './files/src/productos.json'
        constructor(){
          this.products = []
          this.path = this.#ruta
        }
        
    getProducts = async () => {
        const fs = require('fs');
        try{
            let data = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(data);
            return products;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    addProduct = async (titulo, desc, precio, imagen, codigo, cantidad) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            if (data.find( x => x.code == codigo) != null)
                return false;
            
            let num = data.length == 0 ? 0 : (data[data.length-1].id + 1);
            const product = {id: num, title: titulo, description: desc, price: precio, thumbnail: imagen, code: codigo, stock: cantidad};
            data.push(product);
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    getProductById = async (id) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                throw "ID no encontrado!";

            return data[index];
        }
        catch (ex) {
            console.log(ex);
        }
    }
    updateProduct = async (id, titulo, desc, precio, imagen, codigo, cantidad) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                throw "ID no encontrado!";
            data[index] = {id:id, title: titulo, description: desc, price: precio, thumbnail: imagen, code: codigo, stock: cantidad};
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
        } 
        catch (ex) {
            console.log(ex);
        }
    }
    deleteProduct = async (id) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                return false;
            data.splice(index);
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
        } 
        catch (ex) {
            console.log(ex);
        }
    }
}
