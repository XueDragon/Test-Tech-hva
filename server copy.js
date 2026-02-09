const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'HTML')))
app.use(express.static(path.join(__dirname, 'Public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'))
}) 

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'register.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'login.html'))
})

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'account.html'))
})

// 404 Not Found
app.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, 'HTML', '404.html')
  )
})

// 500 Server Error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
