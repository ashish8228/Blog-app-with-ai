import mongoose, { mongo } from "mongoose";


 const  ConnectDB = async ()=>{
    try{
        mongoose.connection.once('connected', ()=> console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/Blog-App`)
    }
    catch(err){
        console.log(err.message);
    }
}

export default ConnectDB;