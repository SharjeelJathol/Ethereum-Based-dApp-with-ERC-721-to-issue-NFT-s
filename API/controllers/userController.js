const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
    let newUser = new User({
        public_address: req.body.public_address,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
    })
    const token = jwt.sign({
        public_address: newUser.public_address,
        ip: req.ip
    }, process.env.PRIVATE_KEY, {
        algorithm: process.env.ALGORITHM
    })
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions)
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    try {
        let response = await newUser.save();
        // console.log(response);
        if (response)
            res.send('Success')
        else
            throw ('Failed to register')
    } catch (err) {
        console.log(err)
        res.status(404).send('Error')
    }
}

exports.login = async (req, res) => {
    let userInfo={password:req.body.password, username:req.body.username}
    try {
        let result=await User.findOne({username:userInfo.username})
        if (result && bcrypt.compareSync(userInfo.password, result.password)) {
            const token = jwt.sign({
                public_address: result.public_address,
                ip: req.ip
            }, process.env.PRIVATE_KEY, {
                algorithm: process.env.ALGORITHM
            })
            const cookiesOptions = {
                expires: new Date(Date.now() + process.env.EXPIRES_IN * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)
            res.send('Success')
        }
        else
            res.send('Failed')
    } catch (err) {
        console.log(err)
        res.send('Failed')
    }

}

exports.loginStatus= async (req, res)=>{
    res.send('True')
}

exports.logout = async (req, res) => {
    const cookiesOptions = {
        expires: new Date(Date.now()+1 * 1000),
        httpOnly: true
    }
    res.cookie('jwt', '', cookiesOptions)
    res.send('Success')
}

exports.username = async (req, res) => {
    try {
        let response = await User.findOne({
            username: req.query.username
        })
        // console.log('Username', req.query.username)
        console.log(response)
        if (response) {
            res.send('True')
        } else {
            res.send('False')
        }

    } catch (err) {
        console.log(err)
        res.status(404)
        res.send('Error');
    }
}

exports.public_address = async (req, res) => {
    try {
        let response = await User.findOne({
            public_address: req.query.public_address
        })
        console.log('public_address', req.query.public_address)
        if (response) {
            res.send('True')
        } else {
            res.send('False')
        }

    } catch (err) {
        console.log(err)
        res.status(404)
        res.send('Error');
    }
}

exports.email = async (req, res) => {

    try {
        let response = await User.findOne({
            email: req.query.email
        })
        console.log('email', req.query.email)
        if (response) {
            res.send('True')
        } else {
            res.send('False')
        }

    } catch (err) {
        console.log(err)
        res.status(404)
        res.send('Error');
    }
}