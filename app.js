const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path')


require("dotenv").config();


app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/userLogin', (req, res) => {
  res.render('indexUser.ejs');
});

app.get('/registerUser', (req, res) => {
  res.render('register.ejs');
});

app.get('/ownerlogin', (req, res) => {
  res.render('indexOwner.ejs');
});

app.get('/registerOwner', (req, res) => {
  res.render('registerOwner.ejs');
});

app.use(express.json());
app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static(path.join(__dirname, 'views')))


app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 포트가 열렸습니다!!^^`);
});

module.exports = app;