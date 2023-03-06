const NFT = require('../models/NFT');
const crypto = require('crypto');
const multer = require('multer')
const {uploadOnIPFS} = require('./ipfsController')
const fs=require('fs')
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

exports.newNFT = async (req, res) => {
    try {
        console.log(req.body)
        if(req.body.url){
            let hash=await uploadOnIPFS(req.body.url)
            hash=hash.cid.toString()
            let response = await NFT.find({nft_id:hash});
            if (response.length>0) {
                fs.unlink(`${__dirname}/../NFTs/${req.body.url}`, err=>{
                    if(err)
                        console.log(err)
                    else
                        res.send('Duplicate')
                })
            } else{
                console.log('unique')
                const NFTobj = new NFT({
                    nft_id: hash,
                    url: req.query.url,
                    name: req.body.name,
                    owner: req.query.public_address,
                    minter: req.query.public_address,
                })
                await NFTobj.save()
                res.send('Done')
            }
        }
        else
            res.send('Failed')
    } catch (err) {
        console.log(err)
        res.send('Failed')
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

