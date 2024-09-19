const mongoose = require("mongoose");

export const connectMongoDB = async () => {
    
    try {
        await mongoose.connect('mongodb://ibra7emdev:Q071OlmnwVY1L1C8@cluster0-shard-00-00.ciove.mongodb.net:27017,cluster0-shard-00-01.ciove.mongodb.net:27017,cluster0-shard-00-02.ciove.mongodb.net:27017/?ssl=true&replicaSet=atlas-42z0sy-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
        console.log("connected to MongoDB");
    } catch (error) {
        console.log("ERROR WITH CONNECTING  MongoDB", error);
    }
};