import { handleErrorMiddleware } from './middlewares/handleError.middleware';
import { AppRoutes } from './routes';
import express from 'express'

const app = express()
const port = 3003

app.use(express.json())

AppRoutes(app)

app.use(handleErrorMiddleware)

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`)
})