const IPFS=require('ipfs-http-client')
const fs=require('fs')
const dotenv = require('dotenv')
dotenv.config({
    path: '../config.env'
});

// https://erc-721.infura-ipfs.io/ipfs/CID
exports.uploadOnIPFS= async filename=>{
    try {
        const projectId = process.env.PROJECTID;
        const projectSecret = process.env.PROJECTSECRET
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const client = await IPFS.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        apiPath: '/api/v0',
        headers: {
            authorization: auth,
        }})
        const imagesDir = process.env.NFTS
        const path=`${__dirname}/${imagesDir}${filename}`

        while(!fs.existsSync(`${path}`));
        const buffer = fs.readFileSync(path)
        const result = await client.add(buffer)
        return result
    } catch (error) {
        console.log(error)
    }
}
