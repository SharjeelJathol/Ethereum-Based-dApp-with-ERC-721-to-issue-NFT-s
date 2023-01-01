const express=require('express')
const app=express();
const cors=require('cors')

//middlewares
app.use(cors({
    origin: ['http://localhost:3000', '*'],
    credentials: true
}));
/*Parse the body of request and add the data in req variable*/
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.listen(3000, ()=>console.log('listening at port 5000.'))
module.exports = app;