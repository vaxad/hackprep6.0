import mongoose from "mongoose";

export async function connectToDb(){
    try {
        const db=process.env.MONGO_URL
        if(!db){
            console.error("Mongo URL is not defined in .env");
            return null
        }
        await mongoose.connect(db)
        console.log('Db Connected')
    } catch (error) {
        console.log(error)
    }
}