import express from 'express'
const app = express()
const port = 3003

import routeProduct from './controllers/products'

app.use(express.json())
app.use('/products', routeProduct)

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`)
})