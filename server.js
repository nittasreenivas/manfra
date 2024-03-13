const express = require('express')
const app = express()
require('dotenv/config')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
var bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes')

app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',productRoutes)

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log(`Database connected succesfully`)
}).catch((err) => {
    console.log(`Database got some err ${err}`)
})

// app.get('/',(req,res) => {
//     res.send('HII Vasu')
// })
const PORT_NO = process.env.PORT_NO 

app.listen(`${PORT_NO}`,() => {
    console.log(`server is running on port ${PORT_NO}`)
})