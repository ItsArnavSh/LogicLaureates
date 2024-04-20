const express = require('express');
const dbConnect  = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
require('dotenv').config();
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require("socket.io");

const app = express();

const PORT = process.env.PORT || 5000;

dbConnect();
cloudinaryConnect();

io.on('connection', (socket) => { 

    socket.on('send name', (username) => { 
        socket.join(username);
    }); 
  
    socket.on('send message', (chat) => { 
        io.to(chat.room).emit('send message', (chat));
    }); 
}); 

app.listen(PORT , ()=>{
    console.log("Connected to server");
})