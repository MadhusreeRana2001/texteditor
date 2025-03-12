import mongoose from 'mongoose';

const connectToMongo = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000
    })
        .then(() => console.log("MongoDB connected"))
        .catch((e) => {
            console.log("Connection unsuccessful");
            console.log(e.message);
        });
};

export default connectToMongo;