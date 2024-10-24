const express = require('express')
const router = express.Router()
const BookingsModel = require('../model/BookingsModel')
const {Rooms} = require('../model/Rooms')
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const { v4: uuidv4 } = require('uuid');
router.post('/bookings',async(req,res)=>{
    const { room, userId, fromDate, toDate, totalDays, totalAmount,token} = req.body;


// code to validate payment
// const customer = await stripe.customers.create({
//     email:token.email,
//     source:token.id
// })
// const payment = await stripe.charges.create({
//     amount:totalAmount*100,
//     currency:'NGN',
//     customer:customer.id,
//     receipt_email:token.email

// },{
//     idempotencyKey:uuidv4()
// })

// if(payment){
    try {
    const newBookings = new BookingsModel({
        room:room.name,
        roomId:room._id,
        userId:userId,
        fromDate,
        toDate,
        totalDays,
        totalAmount,
        transactionId:'1234',
        token:token._id
     })
  const booking = await newBookings.save()
    
     const bookedRooms =await Rooms.findOne({_id:room._id}) //push to currentBookings
     bookedRooms.currentBooking.push({
         bookingId:booking._id,
         fromDate,
         toDate,
         userId:userId,
         status:booking.status
     })

await bookedRooms.save()
    
res.send('payment successful,room is booked')
  
        } catch (err) {
            res.status(400).json(err)
        }
})

router.post('/getBookingById',async(req,res)=>{
    const userId = req.body.userId
try {  
    const bookings = await BookingsModel.find({userId:userId})
res.send(bookings)
} catch (error) {
    res.status(400).json({error})
}
})
router.post('/cancelBooking',async(req,res)=>{
    const {bookingId,roomId} = req.body
    const bookingItem = await BookingsModel.findOne({_id:bookingId})
    bookingItem.status='Cancelled'
await bookingItem.save()
const room = await Rooms.findOne({_id:roomId})
const bookings = room.currentBooking
const temp = bookings.filter(booking=>booking.bookingId.toString()!==bookingId)
room.currentBooking = temp
await room.save()
res.send('room cancelled sucessfully')

})
router.get('/getAllBookings', async(req,res)=>{
    const bookings =await  BookingsModel.find()
    res.send(bookings)
})
module.exports=router