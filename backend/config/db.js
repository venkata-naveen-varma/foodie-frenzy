import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    }catch(error){
        console.log("DB connect error msg: ", error.message);
    }
}
