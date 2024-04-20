const cloudinary = require('cloudinary').v2;

exports.mediaDeleter = async(publicId)=>{

    await cloudinary.uploader.destroy(publicId , (error , result)=>{
        if(error){
            console.log("Destroy video error"   , error);
        }
    })
}