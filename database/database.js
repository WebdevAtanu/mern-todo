import mongoose from 'mongoose';
const url=process.env.MONGO_URL;
const db='todo';

const connection=async()=>{
	await mongoose.connect(`${url}/${db}`)
	.then(()=>{
		console.log('database connected');
	}).catch(err=>{
			console.log(err);
		})
}
export default connection;