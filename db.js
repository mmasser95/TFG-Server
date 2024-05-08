const mongoose=require('mongoose');
const config=require('./config');
const connectDB = async()=>{
	try {
		const conn= await mongoose.connect('mongodb://127.0.0.1/myApp3');
		console.log(`MongoDB connectat a l'adreça ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

module.exports=connectDB;
