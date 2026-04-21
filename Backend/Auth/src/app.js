const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: "https://frontend01-i8u5.onrender.com",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

module.exports = app
