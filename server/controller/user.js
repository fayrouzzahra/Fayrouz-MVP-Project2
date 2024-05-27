const bcrypt = require('bcrypt');
const user = require('../model/index')
const jwt =require('jsonwebtoken')
const db=require('../model/index')

module.exports = {
    getAll: async(req,res)=>{
        try{
            const user = await db.User.findAll({});
            res.status(200).send(user);
        }
        catch(error){
            throw error;
        }
    },


//////
    getOneUser: async(req,res)=>{
        try{
            const user = await db.User.findOne({where: {id:req.params.id}});
            res.status(200).send(user)
        }
        catch(error){
            throw(error)
        }
    },


    //////
postUser: async (req, res) => {
    const {email,password,name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
   try{
        
        
        const newUser = db.User.create({email:email,password: hashedPassword ,name:name});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message)
    }
},


    ///////////////////////
loginUser: async (req, res) => {
    try {
        const {email, password } = req.body;
console.log(email);
        const user = await db.User.findOne({where: {email:email}});

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        } 
         const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json(user);
        } 
        else {
            res.status(400).send("wrong password or username");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
},


///////
updateUser: async (req, res) => {
    try {
        const {name, email, password} = req.body
        const updateUser = await db.User.update({ name, email, password},{ where: { id: req.params.id } }
            );
            res.status(200).send(updateUser);
        } catch (error) {
            throw error;
        }
    },


    /////////
    deleteUser: async(req,res)=>{
        try{
            const user = await db.User.destroy({where: {id:req.params.id}});
            res.json(user);
        }
        catch(error){
            throw error
        }
    }
}

