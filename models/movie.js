const mongoose = require('mongoose');

// creating a schema 
const movieSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,

  },
  description:{
    type: String,
    required: [true, 'description is required'],
    trim: true,

  },
  duration:{
      type: Number,
      required: [true, 'Duration is required'],
  },
  ratings:{
    type: Number,
  },
  totalRatings:{
    type: Number,
  },
  releaseYear:{
    type: Number,
    required: [true, 'Release date is required'],
  },
  releaseDate:{
    type: Date,
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
  genres:{
    type: [String],
    required: [true, 'Genre is required'],
  },
  directors:{
    type: [String],
    required: [true, 'Director is required'],
  },
  coverImage:{
    type: String,
    required: [true, 'Cover image is required'],
  },
  actors:{
    type: [String],
    required: [true, 'Actors are required'],
  },
  price:{
    type: Number,
    required: [true, 'Price is required'],
  },
});

// creating  a model 
module.exports = mongoose.model('Movie', movieSchema);

