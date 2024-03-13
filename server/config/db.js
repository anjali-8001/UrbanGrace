const mongoose = require("mongoose");

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connected");
    }catch(error){
        console.log(`Mongodb error ${error}`)
    }
}
module.exports = connectDb;