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
    const db = client.db('myfinme-stocks')
    const stockCollection = db.collection('stocks')

    app.listen(2022, function(){
        console.log(`Your fridge is running on port ${PORT}, better catch it!`)
    })

    app.set('view engine', 'ejs')
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/public', express.static('public'))
    
    app.get('/', function(req, res){
        const cursor = db.collection('stocks').find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs', { stocks: results })
        })
        .catch(error => console.error(error))
    })
    
    app.post('/stocks', function(req, res){
    stockCollection.insertOne(req.body)
        .then(result =>{
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

  })
  .catch(error => console.error(error))