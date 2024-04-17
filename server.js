const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener')

app.set('view engine', 'ejs')

/*
parse the body of POST requests so that req.body.fullUrl  
can be accessed in the /shortUrls route handler
*/
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

/*
This route handler is responsible for creating a new 
ShortUrl document in a MongoDB database based on the
value of the fullUrl property received from the client.
*/
app.post('/shortUrls', async (req, res) => {
   await ShortUrl.create({ full: req.body.fullUrl }) // form input name is fullUrl
   res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks ++
    await shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 3000);