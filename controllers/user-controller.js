const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(UserData => res.json(UserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(UserData => {
                // If no User is found, send 404
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

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(UserData => res.json(UserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(UserData => {
                // If no User is found, send 404
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

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(UserData => {
                // If no User is found, send 404
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

module.exports = userController;









