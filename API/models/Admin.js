const mongoose=require('mongoose')

const AdminSchema=new mongoose.Schema({
    admin_id: String,
    password: String,
    name: String,
    email: String,
    public_address: String,
})
const Admin = mongoose.model('Admin', AdminSchema);

module.exports=Admin;