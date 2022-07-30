require('dotenv').config()

const express = require('express');
const compression = require('compression')

const app = express()

app.use("/public", express.static(__dirname + '/public'));
app.use(compression());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
//middlewares

app.use('/', require('./src/routes/middlewares'))

//routes
app.use('/dbTest', require('./src/routes/dbTest'))
app.use('/auth', require('./src/routes/auth'))

app.listen(process.env.PORT, ()=>{
  console.log('server is running on', process.env.PORT)
})