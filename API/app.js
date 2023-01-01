const express=require('express')
const app=express();
const cors=require('cors')

//middlewares
app.use(cors({
    origin: ['http://localhost:3000', '*'],
    credentials: true
}));

// app.listen(3000, ()=>console.log('listening at port 5000.'))
module.exports = app;