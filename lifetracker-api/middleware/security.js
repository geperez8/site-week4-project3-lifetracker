const jwt = require("jsonwebtoken")

const {SECRET_KEY} = require("../config")

const {UnauthorizedError} = require("../utils/errors")

// * function that extracts the JWT from the request header
const jwtFrom =  ({headers}) => {
    if (headers?.authorization){
        // Authorization: Bearer bvibviiruee
        
        const [scheme, token] = header.authorization.split(" ")
        if (scheme.trim() === "Bearer"){
            return token
        }
    }
}

// * function to attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if (token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }

        return next()
    }
    catch(error){
        return next()
    }
}

// * function that verifies a authed user exists

const requireAuthenticatedUser = (req, res, next) => {
    try {
        const {user} = res.locals
        if (!user?.email){
            throw new UnauthorizedError
        }
        return next()
    } catch (error){
        return next(error)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}