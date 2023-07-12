const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv/config');

const router = express.Router();

let Users = []
// sign up
router.post('/register', async (req,res)=>{
    const { email, password } = req.body;
    try {
        if (!email || !password) { 
            res.status(404).json({
                status: false,
                message: 'Email/Password cannot be empty'
           }) 
        } else {
            let UserID = Math.random();
               //Hashing the password
            const hashedpassword = bcrypt.hashSync(password, 10);
            let new_user = {
                id:UserID,
                email,
                password:hashedpassword
            }
            console.log('new_user :>> ', new_user);
            Users.push(new_user)
                var token = jwt.sign({UserLevel: process.env.PERMISSION_LEVEL_1}, process.env.SECRET_KEY);
                res.status(201).json({
                    status: true,
                    message: "User Account created successfully",
                    user: {
                        id:UserID,
                        email,
                        token
                    }
                })
            }
        } catch (error) {
            console.log('catch error',error);
            res.status(500).json({
                status: false,
                message:"Something went wrong, Please try again."
           })
        }
});

// LOGIN ROUTE
router.post('/login', async (req, res)=>{
    var {email,password} = req.body;

    //CHECK Phone and Password if empty
    if (email.length == 0 || password.length == 0 || !email || !password) {
        console.log('ILOG', "empty parameters")
        res.status(404).send({
            status: false,
            message: 'Enter all login details!'
        })
        return;
    } else { 
        Users.map((user) => { 
            if (user.email == email) { 
                    bcrypt.compare(password, user.password).then((result)=>{
                        // generate token here with UserID 
                            var token = jwt.sign({UserLevel: process.env.PERMISSION_LEVEL_1}, process.env.SECRET_KEY);
                            if(result ==true){
                                console.log('bcrypt message', result)
                                //sending response 
                                console.log('user login', {
                                        token,
                                        id:user.id,
                                        email:user.email
                                    });
                                return res.status(200).json({
                                    status: true,
                                    message: 'user login successful',
                                    user: {
                                        token,
                                        id:user.id,
                                        email:user.email
                                    }
                                }) 
                            }else{
                                res.status(404).send({
                                    status: false, 
                                    message: 'password incorrect!', 
                                })
                            }
                    }).catch((err)=>{ 
                        res.status(404).send({
                            status: false, 
                            message: 'password error!'
                        })
                        return;
                    })
            }
            else {
                return res.status(500).send({
                    status: false,
                    message:"Something went wrong, Please try again."
                })
            }
        })
    }


       
     
});



module.exports = router; 