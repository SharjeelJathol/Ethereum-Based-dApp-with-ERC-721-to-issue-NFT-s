const mongoose=require('mongoose')

const NFTSchema=new mongoose.Schema({
    nft_id: String,
    url: String,
    name: String,
    owner: String,
    minter: String,
})
const NFT = mongoose.model('NFT', NFTSchema);

module.exports=NFT;