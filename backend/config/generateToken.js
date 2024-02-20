const jwt = require('jsonwebtoken');
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SCERET,{
        expiresIn:process.env.JWT_EXPIRES_TIME,
    });
};

module.exports = generateToken;