
import { Router } from 'express'
import { ProductManager } from '../productManager.js'
import { CartManager } from '../cartManager.js'

const router = Router()

const productManager = new ProductManager()
const cartManager = new CartManager()

router.post('/', async (req, res) => {
  await cartManager.createCart()
  res.send({mensaje: 'Carrito creado'})
})

router.get('/:carID', async (req, res) => {
  const { carID } = req.params

  try {
    const cartProducts = await cartManager.getCartProducts(carID)
    //await cartManager.addToCart(carID, proID)
    res.send({mensaje: `Lista de productos del carrito con id ${carID}`,
              productos: cartProducts.products})
  } catch (error) {
    console.log(error);
  }
})

router.post('/:carID/product/:proID', async (req, res) => {
  const { carID, proID } = req.params

  try {
    await cartManager.addToCart(carID, proID)
    res.send({mensaje: 'Producto agregado al carrito'})
  } catch (error) {
    console.log(error);
  }
})

export default router