const { Thought, User } = require('../models');

const thoughtController = {

    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(ThoughtData => res.json(ThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(ThoughtData => {
                // If no Thought is found, send 404
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create Thought
    addThought({ body }, res) {
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
                console.log(err);
                res.status(400).json(err);
            });
    },
    // update Thought

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body,
            { new: true })
            .then(ThoughtData => {
                // If no Thought is found, send 404
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
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
                console.log(err);
                res.status(400).json(err);
            });
    }

};


module.exports = thoughtController;