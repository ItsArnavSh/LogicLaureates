const User = require("../models/User");
const Message = require('../models/Messages');
const Chat = require('../models/Chats');

exports.createMessage = async(userId1 , userId2 , messageData) => {
    try{    

        const chat = await Chat.find({User: [userId1 , userId2]});

        let chats;
        if(!chat){  
            chats = await chats.create({
                User: [userId1 , userId2],
                messages: [],
            });
        }

        const message = await Message.create({userId1 , userId2 , messageData});

        const updatedChat = await Chat.findByIdAndUpdate({_id: chats._id} , {$push:{messages:message._id}} , {new: true});

        const updatedUser = await User.findByIdAndUpdate({_id: userId1} , {$push:{chats: updatedChat._id}} , {new: true});


        if(!updatedChat){
            return res.status(400).json({
                success: false,
                message: "Message not sent",
            });
        }

        return res.status(200).json({
            success: true,
            data: message,
        });
        

    } catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
} 

exports.getAllConversations = async(req, res)=>{
    try{

        const {userId} = req.body;

        const chats = await User.findById(userId).populate({
            path: 'chats',
            populate: {
                path: 'user',
                model: 'User',
            }
        });

        if(!chats){
            return res.status(400).json({
                success: false,
                message: "No chats found",
            });
        }

        return res.status(200).json({
            success: true,
            data: chats.chats,
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteMessage = async(req, res)=>{

    try{

        const {messageId , chatId} = req.body;

        const deletedMessage = await Message.findByIdAndDelete({_id: messageId});

        if(!deletedMessage){
            return res.status(404).json({
                success: false,
                message: "Message does not exist",
            })
        }

        const updatedChat =  await Chat.findByIdAndUpdate({_id: chatId} ,{$pull:{messages:messageId}} ,{new:true});

        return res.status(200).json({
            success: true,
            message: "Message successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the message",
            error: error.message,
        });
    }

} 

// exports.editMessage = async(req , res)=>{

// }

exports.getMessages = async(res , res)=>{
    try{
        const {userId1 , userId2} = req.body;

        const chat = await Chat.find({User: [userId1 , userId2]}).populate('messages').;

        if(!chat){
            return res.status(400).json({
                success: false,
                message: "No chat found",
            });
        }

        return res.status(200).json({
            success: true,
            data: chat.messages,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching messages",
            error: error.message,
        })
    }
}