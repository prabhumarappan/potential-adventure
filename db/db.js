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


module.exports = {
    createDBConnection,
    userExists
}
