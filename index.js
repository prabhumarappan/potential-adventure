const express = require('express');
const app = express();
const db = require("./db/db");
const bodyParser = require('body-parser');

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


})

app.listen(8083, () => console.log("Webservice is running on 8083"));