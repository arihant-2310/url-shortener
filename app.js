require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const _PORT_ = process.env.PORT || 2310;
const ShortUrl = require("./src/models/UrlModel");

//allow cross origin requests
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");app.use(express.urlencoded({ extended: false }));

const connection = require('./src/config/db.config');
connection.once('open', () => console.log('DB Connected'));
connection.on('error', () => console.log('Error'));

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

app.listen(_PORT_, ()=>{
    console.log(`Application is listening on port: ${_PORT_}`);
});
