import {products, users} from '../utils/constants.js';

//userIndexById middleware
export const getUserIndexById=(req,res,next)=>{
        const id=parseInt(req.params.id);
    if(isNaN(id)){
       return res.status(400).send({msg:"Invalid Request,No user ID found"});
    }
    const userIndex=users.findIndex((user)=>user.id===id);
    if(userIndex===-1){
        return res.status(404).send({msg:"No user found with given ID"});
    }
    req.userIndex=userIndex;
    next();
} 

//productIndexById middleware

export const getProductIndexById=(req,res,next)=>{
        const id=parseInt(req.params.id);
    if(isNaN(id)){
       return res.status(400).send({msg:"Invalid Request,No product ID found"});
    }
    const prodIndex=products.findIndex((prod)=>prod.id===id);
    if(prodIndex===-1){
        return res.status(404).send({msg:"No product found with given ID"});
    }
    req.prodIndex=prodIndex;
    next();
} 
