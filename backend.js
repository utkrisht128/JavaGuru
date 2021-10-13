const fs = require("fs");
const express = require("express")
const app = express();
const path = require("path");
const http = require("http");
const hostname = '127.0.0.1';
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/utkrisht', { useNewUrlPaser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
    console.log("Hello World")
});
const port = process.env.PORT || 80;
var test = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: Number,
    confirmpassword: Number
});
var data = mongoose.model('data', test);
//Express
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
//PUG
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res) => {
    res.status(200).render('webdevelopment.pug');
});
app.get('/webdevelopment.html', (req, res) => {
    res.status(200).render('webdevelopment.pug');
});
app.get('/signweb.html', (req, res) => {
    res.status(200).render('signin.pug')
})
app.post('/webdevelopment.html', (req, res) => {
    var form = new data(req.body);
    form.save().then(() => {
        res.send("Form submitted succesfully")
    }).catch(() => {
        res.status(400).send("Form not submitted")
    })
});
app.get('/article.html', (req, res) => {
    res.status(200).render('article.pug');
});
app.get('/article1.html', (req, res) => {
    res.status(200).render('article1.pug');
});
app.get('/article2.html', (req, res) => {
    res.status(200).render('article2.pug');
});
app.get('/article3.html', (req, res) => {
    res.status(200).render('article3.pug');
});
app.get('/article4.html', (req, res) => {
    res.status(200).render('article4.pug');
});
app.get('/lecture.html', (req, res) => {
    res.status(200).render('lecture.pug');
});
app.get('/technews.html', (req, res) => {
    res.status(200).render('technews.pug');
});
app.get('/about.html', (req, res) => {
    res.status(200).render('about.pug');
});
app.listen(port, () => {
    console.log('the application started succesfully')
})