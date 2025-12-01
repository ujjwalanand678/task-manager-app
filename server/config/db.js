import mongoose from "mongoose"

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB`)
    } catch (error) {
        console.error("Error connecting mongoDB" , error)
        console.log("Error")
        process.exit(1) // Exit process with failure. (1) indicates failure and (0) indicates success.
    }
}
export default connectDB