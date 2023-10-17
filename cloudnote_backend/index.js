const conectToMongo = require('./db');
let cors= require("cors")
const express = require('express')
conectToMongo();
let app = express()
app.use(cors())
require("dotenv").config(); 
const port = process.env.b_PORT
console.log(port)
app.use(express.json());
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`CloudNote app listening on port at http://localhost:${port}`)
})