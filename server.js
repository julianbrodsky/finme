const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = process.env.PORT || 2022
const url = process.env.MONGOURL

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('myfinme-stocks')
    const stockCollection = db.collection('stocks')

    app.listen(PORT, function(){
        console.log(`Your fridge is running on port ${PORT}, better catch it!`)
    })

    app.set('view engine', 'ejs')
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/public', express.static('public'))
    
    app.get('/', function(req, res){

        const cursor = db.collection('stocks').find().sort({"investment":-1}).toArray()
        .then(results => {
            let dollars = []
            results.forEach( (item, index) => {
                fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.ticker}&apikey=RWCO7X3U4LDYNTPG`)
                .then(alp => alp.json())
                .then(alp => {
                    let tickerPQ = [item.ticker, alp['Global Quote']['05. price'], results[index]['investment']]
                    console.log(tickerPQ)
                    dollars[index] = alp['Global Quote']['05. price']
                    stockCollection.updateOne({
                        ticker: item.ticker
                    }, {
                        $set: {
                            price: alp['Global Quote']['05. price']
                        }
                    })
                    
                })
                .catch(err => console.log(err))
                
            })
            return(results)
        })
        .then(results => {
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