'use strict';

const home = (req, res) => {
    res.render('index.ejs');
}

const userLogin = (req, res) => {
    res.render('indexUser.ejs');
}

const registerUser = (req, res) => {
    res.render('register.ejs');
}

const ownerLogin = (req, res) => {
    res.render('indexOwner.ejs');
}

const registerOwner = (req, res) => {
    res.render('registerOwner.ejs');
}

module.exports = {
    home,
    userLogin,
    registerUser,
    ownerLogin,
    registerOwner
};