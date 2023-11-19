const mongoose = require('mongoose');
const itemschema = new mongoose.Schema({
    name:String,
    email:{
        type :String, 
        unique : true,
        required : true
    },
    password:String
});
const item = mongoose.model('Item',itemschema);
module.exports = item;  