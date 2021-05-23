const { Thought, User } = require('../models');

const thoughtController = {

    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then(ThoughtData => res.json(ThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // get Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select("-__v")
            .then(ThoughtData => {
                // If no Thought is found, send 404
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // create Thought
    addThought({ params, body }, res) {
        Thought.create(body)

            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // update Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body,
            {
                new: true,
                runValidators: true,
            })
            .then(ThoughtData => {
                // If no Thought is found, send 404
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(ThoughtData => {
                // If no Thought is found, send 404
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            {
                new: true,
                runValidators: true,
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, }
        )
            .then(UserData => res.json(UserData))
            .catch(err => {
                res.status(400).json(err);
            });
    }
};


module.exports = thoughtController;