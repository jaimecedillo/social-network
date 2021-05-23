const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(UserData => res.json(UserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: '-__v'
                },

            ])
            .select('-__v')
            .then(UserData => {
                // If no User is found, send 404
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

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(UserData => res.json(UserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body,
            {
                new: true,
                runValidators: true,
            })
            .then(UserData => {
                // If no User is found, send 404
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

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(UserData => {
                // If no User is found, send 404
                if (!UserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: UserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: UserData.username })
                            .then(() => {
                                res.json({ message: 'User has been deleted' });
                            })
                            .catch((err) => res.status(400).json(err));
                    })
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    },
    // add a friend

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            {
                new: true,
                runValidators: true,
            })
            .then(UserData => {
                // If no User is found, send 404
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

    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            {
                new: true,
            })
            .then(UserData => {
                res.json(UserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
};



module.exports = userController;









