const {User,validateUser} = require('../model/UserModel')
const express = require('express')
const router = express.Router()

router.post('/register' ,async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('user with email '+ req.body.email + ' already exists')

    const {error}= validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
        try {
            const user = new User(req.body)
 await user.save()
res.status(201).send('User registered successfully!...')
        } catch (error) {
            res.status(400).send(error)   
        }

})
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
   

})
router.get('/getAllUsers',async(req,res)=>{
    const users = await User.find()
    res.send(users)
})

module.exports=router