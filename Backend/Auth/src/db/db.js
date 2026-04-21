const mongoose = require('mongoose')

async function connectDB(){

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB successfuly")
    } catch (error) {
        console.log("Not connected to DB check error")
    }
}

module.exports = connectDB