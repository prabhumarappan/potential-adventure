const express = require('express');
const app = express();
const db = require("./db/db");
const bodyParser = require('body-parser');
const auth = require('./middleware/auth/auth');

app.use(bodyParser.json());

/*
 * API to sign a user and return a access token and refresh token
 * First we check if user exists with the specific email and password, otherwise
 * we return a 404 response
 *
 * Access token is valid for 5 mins
 * Refresh Token is valid for 1 day
 */
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
            console.log(err);
            res.status(500);
            res.json({
                "error": "Internal Server Error"
            });
        })
});


/*
 * API to return country and details of their gmt offset in seconds
 * Call a DB function to get details of all the countries and their
 * respective GMT Offset.
 *
 * If any error connecting with database, then a 500 status code is returned!
 * Middleware checkAuth is used to validate the access token that is being passed
 * and also throws errors if it has expried
 */
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


/*
 * API to get GMT Offset for a specific country
 * Call a function to check if the country exists, othertwise an error code is
 * returned
 *
 * Middleware checkAuth is used to validate the access token that is being passed
 * and also throws errors if it has expried
 */
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


/*
 * API to use the refresh token and generate a new access token
 *
 * Middleware checkRefresh checks if the token passed in the Authorization
 * header is a valid one and has not expired!
 */
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

// To start the app server on port 8083
app.listen(8083, () => console.log("Webservice is running on 8083"));
