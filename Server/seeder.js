const fs=require('fs');
const mongoose=require('mongoose');
const colors=require('colors');
const dotenv=require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const User=require('./models/User');
const Contributor=require('./models/Contributor');
const News=require('./models/News');
const Event=require('./models/Event');
const Project=require('./models/Project');


// Connect to DB
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open',()=>{
    console.log('MongoDB Connected'.cyan.underline);
})

// Read JSON files

const users=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8')
);

const contributors=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/contributors.json`,'utf-8')
);

const news=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/news.json`,'utf-8')
);

const events=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/event.json`,'utf-8')
);

const project=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/project.json`,'utf-8')
);


// Import into DB
const importData=async()=>{
    try{
        // First, create bootcamps and users
        await User.create(users);
        await Contributor.create(contributors);
        
        await News.create(news);
        await Event.create(events);
        await Project.create(project);

        
        console.log('Data Imported....'.green.inverse);
        process.exit()
    }catch(err){
        console.log(err);
    }
}

// Delete data
const deleteData=async()=>{
    try{
        await User.deleteMany();
        await Contributor.deleteMany();
        await News.deleteMany();
        await Event.deleteMany();
        await Project.deleteMany();
        console.log('Data Destroyed....'.red.inverse);
        process.exit()
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2]==='-i'){
    importData();
}else if(process.argv[2]==='-d'){
    deleteData();
}

