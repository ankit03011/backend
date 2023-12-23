const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'today'
})

dbConnect.connect((err) => {
    if (err) {
        console.log(err.sqlMessage)
    }
    console.log("Database connected")
})

// app.get('/api/get', (req, res) => {
//     res.send({
//         message: "This is get method"
//     })
// })

app.get('/api/get', async (req, res) => {
    try {
        const sqlQuery = `SELECT * FROM customer`
        await dbConnect.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(400).json("Not Found")
            }
            res.status(200).json({ "response": result })
        })
    } catch (error) {
        res.status(500).json("Server Error")
    }
})

// app.post('/api/post', (req, res) => {
//     const { name, age } = req.body
//     const result = { name, age }
//     res.status(201).json(result)
//     console.log(name, age)
// })

app.post('/api/post', async (req, res) => {
    try {
        const { cid, cname, address } = req.body
        const data = { cid, cname, address }
        const sqlQuery = `INSERT INTO customer SET ?`
        await dbConnect.query(sqlQuery, data, (err, result) => {
            if (err) {
                res.status(400).json("Not Found")
            }
            res.status(201).json(result)
        })
    } catch (error) {
        res.status(500).json("Server Error")
    }
})

app.listen(port, (err) => {
    console.log(`server is started on port http://localhost:${port}`)
})