const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();
const app = express();
const ShortUrl = require("./../models/UrlModel");

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })

    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.save()

    res.redirect(shortUrl.full)
})

module.exports = router