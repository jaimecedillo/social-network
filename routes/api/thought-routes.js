const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// Set up GET one, PUT, /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

//PUT,create new thought and associate with user /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);
// DELETE, thought associate with user /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought);




module.exports = router;