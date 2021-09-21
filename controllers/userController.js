const router = require('express').Router();
const {UniqueConstraintError} = require('sequelize/lib/errors')
const { UserModel} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateJWT = require('../middleware/validate-jwt');



router.post('/register', async (req,res)=> {
    let { username, password } = req.body
    if(username.length >= 4 && password.length >= 6){
        try{
            const User = await UserModel.create({
                username,
                password: bcrypt.hashSync(password, 21),
                // passwordKEY: bcrypt.hashSync(passwordKEY, 20)
            })
            let token = jwt.sign({id: User.userID}, process.env.JWT_SECRET, {expiresIn: '1d'})
            res.status(201).json({
                message: 'User Registered',
                user: username,
                sessionToken: token
            })
        } catch{
            if(err instanceof UniqueConstraintError){
                res.status(409).json({
                    message: 'Username already in use'
                })
            }else{
                res.status(500).json({
                    message: 'Failed to Register User, please be sure to include at least one number in your password.'
                })
            }
        }
    }
})

router.post('/login', async (req,res)=>{
    let {username, password} = req.body
    try{
        let loginUser = await UserModel.findOne({
            where:{
                username: username
            }
        })
        if(loginUser){
            let passwordComp = await bcrypt.compare(password, loginUser.password)
            if(passwordComp){
                let token = jwt.sign({id: loginUser.userID}, process.env.JWT_SECRET, {expiresIn: '1d'})
                res.status(200).json({
                    message: "Log in successful.",
                    sessionToken: token
                })
            } else{
                res.status(401).json({
                    message: 'Incorrect username or password.'
                })
            }
        } else{
            res.status(401).json({
                message: 'Incorrect username or password.'
            })
        }
    } catch(err){
        res.status(500).json({
            message: 'Failed to login User'
        })
    }
})


router.put('update/bio', validateJWT, async(req,res)=>{
    const { bio } = req.body
    const userId = req.users.id
    const query = {
        where: {
            userID: userId
        }
    }
    const updatedBio = {
        bio: bio
    }
    try{
        const update = await UserModel.update(updatedBio, query)
        res.status(200).json(update)
    } catch(err){
        res.status(500).json({error: err})
    }
} )



module.exports = router