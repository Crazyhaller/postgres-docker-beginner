const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

// Routes
app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM schools')
    res.status(200).send(data.rows)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

app.post('/', async (req, res) => {
  const { name, location } = req.body
  try {
    await pool.query('INSERT INTO schools(name, address) VALUES($1, $2)', [
      name,
      location,
    ])
    res.status(200).send({ message: 'Student added in the table' })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

app.get('/setup', async (req, res) => {
  try {
    await pool.query(
      'CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))'
    )
    res.status(200).send({ message: 'Table created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
