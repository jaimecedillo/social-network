const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// Set up GET all thoughts at /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// Set up GET one, PUT, /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

//POST,create new thought and associate with user /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);
// DELETE, thought associate with user /api/thoughts/:userId/:thoughtId
router
    .route('/:thoughtId/reactions')
    .delete(removeThought);

// PUT Create add reaction /api/thoughts/<thoughtId>/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// DELETE reaction /api/thoughts/<thoughtId>/reactions/<reactionId>
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;