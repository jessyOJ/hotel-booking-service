const {Rooms} = require('../model/Rooms')
const express = require('express')
const router = express.Router()
router.post('/createRoom',async(req,res)=>{
  try {
    const rooms = new Rooms(req.body);
    const result = await rooms.save()
    res.status(201).send('room created successfully')
    console.log(result)
  } catch (error) {
    res.send(error.message)
    console.log(error)
  }
  
})
router.post('/getRoomsById',async (req,res)=>{
      try {
    const id =req.body.id
        const room = await Rooms.findOne({_id:id})
        res.status(200).send(room)
      } catch (error) {
        res.status(400).send(error.message)
      }
 
})


router.get('/getRooms',async(req,res)=>{
  try {
    const rooms = await Rooms.find({
        })
     res.status(200).send(rooms)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
module.exports=router