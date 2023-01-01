const mongoose = require('mongoose')
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config({
    path: './config.env'
});

mongoose.set('strictQuery', 'false')
mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
})
.then(() => console.log('DB connection successful!'))
.catch(err=>console.log(err))

app.listen(3000, () => console.log('listening at port 5000.'))