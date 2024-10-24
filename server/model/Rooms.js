const Joi = require('joi')
const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    maxCount:{
        type:String,
        required:true
    },
    rentPerDay:{
        type:String,
        required:true
    },
    
    phoneNumber:{
        type:String,
        required:true
    },
    imgUrl:[],
    currentBooking:[],
    description:{
        type:String,
        required:true
    }
},{timestamps:true}
)
const Rooms = mongoose.model('rooms',roomSchema)

// function validateRoom(rooms){
//     const schema  = Joi.object({
//         name: Joi.string().min(3).max(255).required(),
//         type: Joi.string().required(),
//         description: Joi.string().required()
//     })
//     return schema.validate(rooms)
// }

exports.Rooms=Rooms
// exports.validateRoom=validateRoom
