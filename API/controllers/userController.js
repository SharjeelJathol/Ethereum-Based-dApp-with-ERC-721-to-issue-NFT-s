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
        console.log(response);
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
    let userInfo={password:req.body.password, public_address:req.body.public_address}
    try {
        let result=await User.findOne({public_address:req.body.public_address})
        if (result && bcrypt.compareSync(userInfo.password, result.password)) {
            const token = jwt.sign({
                public_address: userInfo.public_address,
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
    } catch (err) {
        console.log(err)
        res.send('Failed')
    }

}

