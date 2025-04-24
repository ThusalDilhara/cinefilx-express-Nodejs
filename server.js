const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const movie = require('./models/movie');
dotenv.config({ path: './config.env' });
const movieRouter = require('./routes/movieRouter');
const authRouter = require('./routes/authRouter');


const app = express();

app.use(express.json());
app.use('/api/v1/movie',movieRouter);
app.use('/api/v1/users',authRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
