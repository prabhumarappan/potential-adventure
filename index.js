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

app.listen(8083, () => console.log("Webservice is running on 8083"));