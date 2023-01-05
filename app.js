const express = require('express');
const app = express();
const port = 4000;
const router = require('./routes');
const path = require('path')

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

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

module.exports = app;
