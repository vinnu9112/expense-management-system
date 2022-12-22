const userModel = require('../models/userModel');


//login callback
const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        let user = await userModel.findOne({email, password});
        
        if(!user){
            res.status(400).send('User Not Found');
        }
        res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
    
}

//register callback
const registerController = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        let newUser = await userModel.findOne({email});

        if(newUser){
            return res.status(400).send('User Found');
        }
            newUser =  await userModel.create({
            name: name,
            password: password,
            email: email,
          });
        res.status(201).json({
            success: true,
            newUser
        });
        
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }

}

module.exports = {loginController, registerController};