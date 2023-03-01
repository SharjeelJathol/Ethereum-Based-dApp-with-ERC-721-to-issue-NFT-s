const User=require('../models/User')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt=require('jsonwebtoken')

exports.authenticate=async (req, res, next)=>{
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.PRIVATE_KEY, {
            algorithm: process.env.ALGORITHM
        }, (err, data) => {
            if (req.ip === data.ip) {
                req.query.public_address = data.public_address;
                // console.log(req.query.friend, data.email)
                next();
            } else
                res.send('false');
        });
    } else {
        res.send('false')
    }
}