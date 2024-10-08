import express from 'express'
const app = express()
const port = 3003

import routeProduct from './controllers/products'
import routerSales from './controllers/sales'

app.use(express.json())
app.use('/products', routeProduct)
app.use('/sales', routerSales)

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`)
})