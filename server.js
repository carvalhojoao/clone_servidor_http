const http = require ('http')
const express = require ('express')
const bodyParser = require ('body-parser')


let contador = 3
let clientes = [
    {
        id: 1,
        nome: 'Joao',
        email: 'joao@email.com'
    },
    
    {
        id: 2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
]

const app = express()
app.use(bodyParser.json())
const porta = 3000
app.set('port', porta)


//localhost:3000/clientes (POST)
app.post('/clientes', (req, res) => {
    const cliente = {
        id: contador++,
        nome: req.body.nome,
        email: req.body.email
    }
    clientes.push(cliente)
    res.status(201).json(clientes)
})

//localhost:3000/clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes)
})


//localhost:3000/clientes/id (PUT)
app.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    let indice = clientes.findIndex(cliente => cliente.id == id)
    let cliente = {
        id: id,
        nome: req.body.nome,
        email: req.body.email
    }

    clientes[indice] = cliente

    res.status(200).json(clientes)
})

//localhost:3000/clientes (DELETE)
app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    let indice = clientes.findIndex(cliente => cliente.id == id)
    if (indice == -1) {
        res.status(204)
    }

    clientes.splice(indice, 1)
    res.status(200).json(clientes)
})




const server = http.createServer(app)
server.listen(porta)