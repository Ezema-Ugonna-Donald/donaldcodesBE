const jwt = require("jsonwebtoken")

const secret = process.env.TOKEN_SECRET

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };

    const options = { expiresIn: '7d' };

    return jwt.sign(payload, secret, options);
}

const verifyAccessToken = (token) => {
    try
    {
        const decoded = jwt.verify(token, secret)

        return { success: true, data: decoded }
    }
    catch (error)
    {
        console.error(error)

        return { success: false, error: error.message}
    }
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}