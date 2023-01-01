const mongoose = require('mongoose')
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config({
    path: './config.env'
});

mongoose.connect(process.env.URI)
    .then(() => console.log('DB connection successful!'));

app.listen(3000, () => console.log('listening at port 5000.'))