exports.allNFTs = async (req, res) => {
    try {
        let response = await NFT.find({});
        if (response) {
            console.log(response)
            res.json(response)
        } else
            res.send('Failed')

    } catch (err) {
        console.log(err)
        res.status(404).send('Error')
    }
    // res.send('None')
}

exports.myOwnedNFTs=async (req, res)=>{
    try {
        let response = await NFT.find({owner:req.query.public_address});
        if (response) {
            console.log(response)
            res.json(response)
        } else
            res.send('Failed')

    } catch (err) {
        console.log(err)
        res.status(404).send('Error')
    }
}

exports.myMintedNFTs=async (req, res)=>{
    try {
        let response = await NFT.find({minted:req.query.public_address});
        if (response) {
            console.log(response)
            res.json(response)
        } else
            res.send('Failed')

    } catch (err) {
        console.log(err)
        res.status(404).send('Error')
    }
}


exports.uploadNFTPhoto = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'NFTs')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const name=file.fieldname +'-' + uniqueSuffix+`.${file.mimetype.split('/')[1]}`
    cb(null, name)
    req.body.url=name
}
})
}).single('NFT')

