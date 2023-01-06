const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path')

app.use(express.json());
app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

require("dotenv").config();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'views')))


app.get('/usermain', (req, res) => {
  res.render('user.ejs');
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 포트가 열렸습니다!!^^`);
});

module.exports = app;

