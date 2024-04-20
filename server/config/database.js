const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log("DB Connection failed");
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect;