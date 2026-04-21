const exprees = require('express')
const cookieParser = require('cookie-parser')



const app = exprees()
app.use(exprees.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth',authRoutes)
module.exports = app