const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


// * function that accepts JSON package and returns JWT
const generateToken = (data) => {
  return jwt.sign(data, SECRET_KEY, { algorithm: "HS256", expiresIn: "24hr" });
};

const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false
    }

    return generateToken(payload)
}

// * this code validates tokens that we get from users
const validateToken = (token) => {
    try{
        const decoded =  jwt.verify(token, SECRET_KEY);
        return decoded
    } catch (error){
        return {}
    }
  
};

module.exports = {
    generateToken,
    createUserJwt,
    validateToken
}