const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const ShortUrl = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener')

app.set('view engine', 'ejs')

/*
parse the body of POST requests so that req.body.fullUrl  
can be accessed in the /shortUrls route handler
*/
app.use(express.urlencoded({extended: false}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // Extract the HTTP method from the _method field
        var method = req.body._method;
        console.log(method, req.body._method);
        // Delete the _method field from the request body
        delete req.body._method;
        // Return the extracted method, which will be used as the overridden HTTP method
        return method;
    }
}));

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

app.delete(('/shortUrl/:id'), async (req, res) => {
    const url = await ShortUrl.findByIdAndDelete(req.params.id);
    if (url == null) return res.sendStatus(404)
    res.redirect('/')
})

app.listen(process.env.PORT || 3000);