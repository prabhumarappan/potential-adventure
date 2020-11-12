const express = require('express');
const app = express();
const db = require("./db/db");
const bodyParser = require('body-parser');
const auth = require('./middleware/auth/auth');
const jwt = require('jsonwebtoken')

app.use(bodyParser.json());

app.post('/api/user/login', (req, res) => {
    email = req.body.email;
    password = req.body.password;
    db.userExists(email, password)
        .then(function(value) {
            // create access token -> valid for 5 mins
            // create refresh token -> valid for 1 day
            // send back both of them in response
        })
        .catch(function (err) {
            // Send a 402 status code
            // Send request body
        })
    res.json("hello");
});

app.get("/api/country/all", (req, res) => {
    db.getAllCountryDetails()
        .then(function(countryDetails) {
            res.json(countryDetails);
        })
        .catch(function(error) {
           // error code
            console.log(error)
           res.json("error occured");
        });
});

app.get("/api/country", (req, res) => {
    var countryName = req.body.CountryName;
    db.getCountryDetails(countryName)
        .then(function(result) {
            res.status(200);
            res.json(result);
        })
        .catch(function(error) {
            // error code
            res.status(500);
            res.json({
                "error": error
            });
        });


app.get("/api/user/refreshToken", auth.checkRefresh, (req, res) => {
    var refreshToken = req.headers.authorization;
    try {
        const response = auth.createJWTRefreshToken(refreshToken, req.decoded);
        res.status(200);
        res.send(response)
    } catch(err) {
        res.status(500);
        res.send({
            "error": "Internal Server Error"
})

app.listen(8083, () => console.log("Webservice is running on 8083"));