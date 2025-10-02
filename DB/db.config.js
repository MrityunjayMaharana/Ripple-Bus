import mongoose from "mongoose"

async function connectDB() {
    try {
        const URI = process.env.MONGO_URI
        const connection = await  mongoose.connect(URI)
        console.log('✅ Connection successfull ✅')
        console.log('Connection host: ', connection.connection.host)
    } catch (error) {
        console.log('❌ Error while connecting to DB ❌: ', error.message)
        process.exit(1)
    }
}
export default connectDB