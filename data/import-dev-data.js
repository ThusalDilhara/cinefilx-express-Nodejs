const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('../models/movie');

dotenv.config({path: './config.env'});

//CONNECT TO MONGODB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

//READ MOVIES.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

//DELETE EXISTING MOVIE DOCUMENTS FROM COLLECTION
const deleteMovies = async () => {
    try{
        await Movie.deleteMany();
        console.log('Data successfully deleted!');
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

//IMPORT MOVIES DATA TO MONGODB COLLECTION
const importMovies = async () => {
    try{
       console.log(movies);
        await Movie.create(movies);
        console.log('Data successfully imported!');
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importMovies();
}
if(process.argv[2] === '--delete'){
    deleteMovies();
}