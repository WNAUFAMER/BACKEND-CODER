import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const router = Router()

const productManager = new ProductManager()

router.get('/', async (req, res) => {
  const { limit } = req.query

  try {
    const data = await productManager.getProducts()

    limit ? res.send(data.slice(0,limit)) : res.send(data)
  } catch (error) {
    console.log(error);
  }
})

router.get('/:proID', async (req, res) => {
  const { proID } = req.params

  try {
    const data = await productManager.getProducts()

    proID ? res.send(data.slice(proID - 1, proID)) : res.send(data)
  } catch (error) {
    console.log(error);
  }
})

router.post('/', async (req, res) => {
  const newItem = req.body
  newItem.status = true

  if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category)  {
    return res.send({mensaje: 'Debe completar todos los campos'})
  }
  let productDb = await productManager.getProducts()
  const data = await productDb.find(product => product.code === newItem.code)

  if (data) {
     res.send({mensaje: 'El código de producto ya existe'})
  } else {
    try {
      await productManager.addProduct(newItem)
      res.send({mensaje: 'Producto agregado'})
    } catch (error) {
    console.log(error);
    }
  }
})

router.put('/:proID', async (req, res) => {
  const { proID } = req.params
  const newItem = req.body

  if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category)  {
    res.send({alerta: 'No puede dejar campos sin completar'})
  } else {
    const prod = newItem
    try {
      await productManager.updateProduct(proID, prod)
      res.send({mensaje: 'Producto actualizado'})
    } catch (error) {
      console.log(error);
    }
  }
})

router.delete('/:proID', async (req, res) => {
  const { proID } = req.params

  try {
    await productManager.deleteProduct(proID)
    res.send({mensaje: 'Producto eliminado'})
  } catch (error) {
    console.log(error);
  }
})

export default router