const router = require('express').Router();
const movieController = require('../controllers/movieController');


router.route('/')
      .post(movieController.createMovie)
      .get(movieController.getAllMovies);

router.route('/:id')
      .get(movieController.getMovie)
      .patch(movieController.updateMovie)
      .delete(movieController.deleteMovie);

 module.exports = router;