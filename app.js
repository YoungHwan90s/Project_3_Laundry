const express = require('express');
const app = express();
const port = 4000;
const router = require('./routes');
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static(path.join(__dirname, 'views')))

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

module.exports = app;
