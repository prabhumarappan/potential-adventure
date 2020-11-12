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
        .then(function(exists) {
            // create access token -> valid for 5 mins
            // create refresh token -> valid for 1 day
            // send back both of them in response
            if (exists) {
                const response = auth.createJWTTokens(email)
                res.status(200);
                res.json(response);
            } else {
                res.status(404);
                res.json({
                    "error": "User does not exist"
                });
            }
        })
        .catch(function (err) {
            res.status(500);
            res.json({
                "error": "Internal Server Error"
            });
        })
});

app.get("/api/country/all", auth.checkAuth, (req, res) => {
    db.getAllCountryDetails()
        .then(function(countryDetails) {
            res.json(countryDetails);
        })
        .catch(function(error) {
           // error code
            res.status(500);
           res.json({
               "error": error
           });
        });
});

app.get("/api/country", auth.checkAuth, (req, res) => {
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
    }
});

app.listen(8083, () => console.log("Webservice is running on 8083"));