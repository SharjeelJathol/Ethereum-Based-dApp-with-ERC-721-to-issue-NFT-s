const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    userName: String,
    password: String,
    name: String,
    email: String,
    public_address: String,
    restricted: Boolean,
})
const User = mongoose.model('User', UserSchema);

module.exports=User;