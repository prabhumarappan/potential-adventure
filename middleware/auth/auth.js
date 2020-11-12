const jwt = require('jsonwebtoken')
const config = require('./config')
const tokenList = {}

/*
 * Auth Middleware to check if the request contains an authorization token,
 * otherwise return an error.
 * Then it checks for the authenticity and validity of the token, if not there
 * it returns an error. otherwise the request is forwarded to the actual function
 */
function checkAuth(req,res,next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).json({"error": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            "error": "No token provided."
        });
    }
}

/*
 * Auth Helper function to generate new Access Token and Refresh Token for a
 * newly logged in user using their email
 */
function createJWTTokens(email) {
    const user = {email: email};
    const token = jwt.sign(user, config.secret, {expiresIn: config.tokenLife});
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
    tokenList[refreshToken] = token
    return {
        "accessToken": token,
        "refreshToken": refreshToken
    }
}

/*
 * Middleware function to check in the request if there is a valid refresh
 * token present. Authenticate and check its Validity
 */
function checkRefresh(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.refreshTokenSecret, function(err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).json({"error": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            "error": "No token provided."
        });
    }
}

/*
 * Auth Helper function to create a new refresh token
 */
function createJWTRefreshToken(refreshToken, decodedToken) {
    const user = {
        user: decodedToken.user
    };
    const token = jwt.sign(user, config.secret, {expiresIn: config.tokenLife});
    tokenList[refreshToken] = token
    return {
        "accessToken": token
    }
}


// exporting these functions so that they are avialable to outside files
module.exports = {
    checkAuth,
    createJWTTokens,
    checkRefresh,
    createJWTRefreshToken
}
