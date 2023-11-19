const item = require('../models/itemModel');
const jwt = require('jsonwebtoken');
const getItem =async()=>{
    return await item.find();
}
const create = async (data) =>{
    const newItem = new item(data);
    return await newItem.save();
}
const deleteItem = async (id) => {
    return await item.deleteOne({_id : id});
}

const updateitem = async (id,data) =>{
    return await item.updateOne({_id : id},{
        $set:{
        name : data.name,
        email : data.email,
        password : data.password
        }
    })
}

const loginitem = async (data)=>{
    const email = data.email;
    return await item.findOne({email : email});
}

const generateToken = (data) =>{
    const payload ={
        id : data._id,
        name : data.name,
        email : data.email
    }
    const secret = 'THIS_IS_SECRET';
    return jwt.sign(payload,secret,{expiresIn:'5m'});
}

const verifyToken = (token)=>{
    const secret = 'THIS_IS_SECRET';
    const decoded = jwt.verify(token, secret);
    return decoded;
}
module.exports = {
    getItem: getItem,
    create: create,
    deleteItem: deleteItem,
    updateitem: updateitem,
    loginitem : loginitem,
    generateToken : generateToken,
    verifyToken : verifyToken
};
