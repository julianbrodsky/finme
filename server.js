const express = require('express')
const app = express()
const PORT = 2022

app.listen(2022, function(){
    console.log(`Your fridge is running on port ${PORT}, better catch it!`)
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})