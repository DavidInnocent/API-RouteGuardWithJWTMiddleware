const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const app = express()

app.use(express.json())



//authenticate the user in the following route to generate a json web token against the access token
//after token has been generated send it to the client. then setup a midlleware to handle verification of the token
app.post('/login', (req, res) => {

    let username = req.body.username

    let user = { name: username }

    const accessToken = generatedAccessToken(user)
    const refreshTokenn = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    res.json({ access_token: accessToken, refresh_token: refreshTokenn })


})


function generatedAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
}

app.listen(process.env.AUTH_PORT, () => {
    console.log("AUTH_PORT server started successfully")
})