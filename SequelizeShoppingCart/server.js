const express=require("express")
const path=require("path")
const bodyParser = require('body-parser');

const app=express()

app.use('/',express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin',require('./routes/admin'))
// app.use('/user',require('./routes/user'))

app.listen(3000);