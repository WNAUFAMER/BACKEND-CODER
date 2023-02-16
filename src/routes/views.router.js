import { ProductManager } from "../src/ProductManager"
const {Router}= require('express')


const router= Router()
module.exports = router

const productManager = new ProductManager()

router.get('/products', async (req, res)=>{
    try {
        const productos = await productManager.getProducts()
        let datos = {
            productos
        }

        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }

})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

export default router