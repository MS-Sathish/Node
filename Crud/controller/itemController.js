const itemService = require('../service/itemService');
const getItem = async (req, res) => {
    const items = await itemService.getItem();
    res.status(200).json(items);
};
const createItem = async (req,res) =>{
    const data = req.body;
    await itemService.create(data);
    const msg = "Saved";
    res.status(200).json(msg);  
}
const deleteItem = async(req,res)=>{
    const id = req.params.id;
    await itemService.deleteItem(id);
    const msg = "Deleted";
    res.status(200).json(msg);
}
const updateItem = async(req,res)=>{
    const id = req.params.id;
    const item = req.body;
    await itemService.updateitem(id,item);
    res.status(200).json("Updated");
}
const loginItem = async(req,res)=>{
    const data = req.body;
    const item1 = await itemService.loginitem(data);
    if(item1 && item1.email === data.email && item1.password === data.password){
        const token = itemService.generateToken(item1);
    res.status(200).json(token);
    }else{
        res.status(500).json("User not found");
    }
}

const authorize = (req,res,next)=>{
    const token = req.header('Authorization');
    const decoded = itemService.verifyToken(token);

    if (decoded) {
      next();
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }

}

module.exports = {
    getItem: getItem,
    createItem : createItem,
    deleteItem: deleteItem,
    updateItem: updateItem,
    loginItem: loginItem,
    authorize : authorize
};