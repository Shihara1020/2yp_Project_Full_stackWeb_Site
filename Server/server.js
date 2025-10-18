const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const colorse=require('colors');
const connectDB=require('./config/db');
const fileupload=require('express-fileupload');
const cookieParser=require('cookie-parser');
const cors=require('cors');
//First Load the env variable
dotenv.config({path:'./config/config.env'});

//Connect the data base
connectDB();

//Route files
const auth=require('./router/auth');
const contributors=require('./router/contributors');
const events=require('./router/events');
const news=require('./router/news');
const projects=require('./router/projects');
const admin=require('./router/admin');

//create a express app
const app=express();


// Enable CORS
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true}
));

//body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

//*********************
//    Middlewares
//********************* 
const errorHandler=require('./middleware/error');
// dev loggin middleware
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());



//*********************
//   Mount routers
//*********************
app.use('/api/v1/auth',auth);
app.use('/api/v1/contributors',contributors);
app.use('/api/v1/events',events);
app.use('/api/v1/news',news);
app.use('/api/v1/projects',projects);
app.use('/api/v1/admin',admin);


//*************** */ 
//   Error handle
//*************** */
app.use(errorHandler);




const PORT=process.env.PORT;
app.listen(PORT,console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.green))

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    server.close(()=>process.exit(1));
})