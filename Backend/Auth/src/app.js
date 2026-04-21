<<<<<<< HEAD
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: "https://shopping-ubwg.onrender.com",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

=======
const exprees = require('express')
const cookieParser = require('cookie-parser')



const app = exprees()
app.use(exprees.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth',authRoutes)
>>>>>>> 10867fdaa6f6c3cc1ef91972707b4811cb927e7a
module.exports = app