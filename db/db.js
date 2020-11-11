var sqlite3 = require('sqlite3').verbose();
var db = null;


function createDBConnection() {
    db = new sqlite3.Database('./task.db', (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function userExists(email, password) {
    return new Promise((resolve, reject) => {
        if (db == null) {
            createDBConnection();
        }
        db.get(`SELECT email from User WHERE email="${email}" AND password="${password}"`, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                if (result) {
                    resolve(true);
                }
                resolve(false);
            }
        });
    })
}

function getAllCountryDetails() {
    return new Promise( (resolve, reject) => {
        if (db == null) {
            createDBConnection();
        }
        db.all(`SELECT Name, Offset FROM CountryDetail`, function(error, rows) {
            if (error) {
                reject(error);
            } else {
                var countryDetails = [];
                rows.forEach(function(row) {
                    countryDetails.push({
                        "Name": row.Name,
                        "Offset": row.Offset
                    });
                });
                resolve(countryDetails);
            }
        });
    })
}

function getCountryDetails(countryName) {
    return new Promise((resolve, reject) => {
        if (db == null) {
            createDBConnection();
        }
        db.get(`SELECT Name, Offset FROM CountryDetail WHERE Name="${countryName}"`, function(error, result) {
            if (error) {
                reject(error);
            } else {
                if (result) {
                    var countryResult = {
                        "Name": result.Name,
                        "Offset": result.Offset
                    }
                    resolve(countryResult);
                } else {
                    reject("country not found!");
                }
            }
        })
    })
}

module.exports = {
    userExists,
    getAllCountryDetails,
    getCountryDetails
}
