const express = require('express');
const dbConnect  = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
require('dotenv').config();
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require("socket.io");
const fileUploader = require('express-fileupload');
const paymentRoutes = require('./routes/Payments');
const adminRoutes = require('./routes/Admin');
const contactUsRoutes = require('./routes/ContactUs');
const updateProfileRoutes = require('./routes/UpdateProfile');
const authRoutes = require('./routes/Auth');
const storageRoutes = require('./routes/Storage');
const ratingsRoutes = require('./routes/RatingsAndReviews');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

dbConnect();
cloudinaryConnect();

app.use(express.json());
app.use(fileUploader({
    useTempFiles: true, 
    tempFileDir: '/temp/'
}));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true 
       
    })
) 

app.use('/api/v1/payments' , paymentRoutes);
app.use('/api/v1/admin' , adminRoutes);
app.use('/api/v1/contactUs' , contactUsRoutes);
app.use('/api/v1/updateProfile' , updateProfileRoutes);
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/storage' , storageRoutes);
app.use('/api/v1/ratings' , ratingsRoutes);

io.on('connection', (socket) => { 

    socket.on('send name', (username) => { 
        socket.join(username);
    }); 
  
    socket.on('send message', (chat) => { 
        io.to(chat.room).emit('send message', (chat));
    }); 
}); 

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})