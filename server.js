const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 2022

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