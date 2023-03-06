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

