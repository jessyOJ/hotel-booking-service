const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    room:{
        type:String, required:true
    },
    roomId:{
        type:String, required:true
    },
    userId:{
        type:String, required:true
    },
    fromDate:{
        type:String, required:true
    },
    toDate:{
        type:String, required:true
    },
    totalDays:{
        type:Number, required:true
    },
    totalAmount:{
        type:Number, required:true
    },
    transactionId:{
        type:String, required:true
    },
    token:[],
    status:{
        type:String  , required:true, default:'booked'
    }

},{timestamps:true})
const Bookings = mongoose.model('bookings',bookingSchema)
module.exports=Bookings