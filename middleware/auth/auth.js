const jwt = require('jsonwebtoken')
const config = require('./config')
const tokenList = {}

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

module.exports = {
    checkAuth,
    createJWTTokens,
    checkRefresh,
    createJWTRefreshToken
}