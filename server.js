import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.get("/itens", (req, res) => {
    const showItem = "SELECT nome, preco, id FROM erosmax_itens"

    database.query(showItem, (error, users) => {
        if (error) {
            console.log(error)
            return
        }

        res.json(users)
    })
})


app.post('/itens', (req, res) => {

    const {nome, preco} = req.body

    const addItem = `
    INSERT INTO erosmax_itens(nome, preco)
    VALUES (?, ?)
    `

    database.query(addItem, [nome, preco], (error) => {
        if(error) {
            console.log(error)
            return
        }

        res.status(201).json({ message: "Usuário Cadastrado com Sucesso!"})
    })
})

app.delete('/itens/:id', (req, res) => {
    const { id } = req.params 

    const query = 'DELETE FROM erosmax_itens WHERE id = ?'

    database.query(query, [id], (err, results) => {
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
    database: "web_03mc",
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    connectionLimit: 10
})