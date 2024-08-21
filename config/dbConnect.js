import mongoose from "mongoose";

async function connectMongo(){
    const url = "mongodb+srv://admin:admin@cluster0.wj62f.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0";

    mongoose.connect(url)
    return mongoose.connection;
}

export default connectMongo;
