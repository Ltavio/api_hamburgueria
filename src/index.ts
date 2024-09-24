import express from 'express'
const app = express()
const port = 3003

app.get('/', (req, res) => {
    res.send('Criando uma API do zero!')
    })

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`) })