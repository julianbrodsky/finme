const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 2022
const url = process.env.MONGOURL

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error))

app.listen(2022, function(){
    console.log(`Your fridge is running on port ${PORT}, better catch it!`)
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/stocks', function(req, res){
console.log(req.body)
})