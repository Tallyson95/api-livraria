import mongoose from "mongoose";

async function connectMongo(){
    const url = process.env.DB_CONNECTION_STRING;

    mongoose.connect(url)
    return mongoose.connection;
}

export default connectMongo;
