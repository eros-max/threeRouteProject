import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())

app.use(cors({
    origin: "*"
}))

const {DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME} = process.env

app.get("/itens", (req, res) => {
    const showItem = "SELECT nome, preco FROM erosmax_itens"

    database.query(showItem, (error, users) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(users)
    })
})


app.post('/itens', (req, res) => {

    const {nome, preco} = request.body.item

    const addItem = `
    INSERT INTO erosmax_itens(nome, preco)
    VALUES (?, ?, ?, ?)
    `

    database.query(addItem, [nome, preco], (error) => {
        if(error) {
            console.log(error)
            return
        }

        response.status(201).json({ message: "Usuário Cadastrado com Sucesso!"})
    })
})

app.delete('/itens/:id', (req, res) => {
    console.log(req.params.id)
    const { id } = req.params 

    const query = 'DELETE FROM erosmax_itens WHERE id = ?'

    mysql.query(query, [id], (err, results) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Erro ao deletar produto.' })
            }
                    
            return res.status(200).json({ message: 'Produto deletado com sucesso.' })
        })
    })

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333.')
})


const database = mysql.createPool({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    connectionLimit: 10
})