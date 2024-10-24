const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const rooms = require('./router/rooms')
const user =require('./router/User')
const bookings=require('./router/BookingDetails')
mongoose.connect('mongodb://localhost:27017/hotel-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=>console.log('connected successfully...'))
.catch((e)=> console.log('unable to connect....', e.message))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use('/api/hotel-booking', rooms);
app.use('/api/hotel-booking', user);
app.use('/api/hotel-booking', bookings);
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('server has started on port 3000...')
})