const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const app=express();
const router=require('./router');
const connectDB=require('./db.js');
const config=require('./config.js');
//app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const port=process.env.PORT||5000;
app.use('/api',router);
connectDB()


app.listen(port, ()=>{
	console.log(`Server listening at port ${port}`);
})

