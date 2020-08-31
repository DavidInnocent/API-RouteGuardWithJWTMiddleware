const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const app = express()

app.use(express.json())


app.post('/award', tokenVerification, (req, res) => {


    let award = {
        phoneNumber: '254703127101',
        amountSpent: '500',
        time: 'leo',
        transaction: 'transacion',
        user_id: req.user
    }
    res.json(award)
})


function tokenVerification(req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.listen(process.env.SERVER_PORT, () => {
    console.log("server started successfully")
})