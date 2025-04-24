const Movie = require('../models/movie');


exports .createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        console.log(movie);
        
        res.status(201).json({
            status: 'success',
            data: {
                movie
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.getAllMovies= async(req,res)=>{

  try{
    
    const queryObj={};
    if (req.query['duration[gte]']) {
      queryObj.duration = { $gte: Number(req.query['duration[gte]']) };
    }
    console.log(queryObj);
    const movies=await Movie.find(queryObj);
    res.status(200).json({
      status:'success',
      results:movies.length,
      data:{
        movies
      }
    })

  }
  catch(error){
    res.status(404).json({
      status:'fail',
      message:error.message
    })
  }
}


exports .getMovie=async(req,res)=>{
  try{
    const movie=await Movie.findById(req.params.id);
    res.status(200).json({
      status:'success',
      data:{
        movie
      }
    })
  }
  catch(error){
    res.status(400).json({
      status:'fail',
      message:error.message
    })
  }
}

exports.updateMovie=async(req,res)=>{

  try{
     const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true});  //to get the updated document, we use new:true
     //runValidators:true to run the validators again on the updated document
     res.status(200).json({
      status:'success',
      data:{
        movie:updatedMovie
      }
     })
   }
   catch(error){
    res.status(400).json({
      status:'fail',
      message:error.message
    })
  }
}

exports.deleteMovie=async(req,res)=>{
  try{
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status:'success',
      data:null
    })
  }
  catch(error){
    res.status(400).json({
      status:'fail',
      message:error.message
    })
  }
}