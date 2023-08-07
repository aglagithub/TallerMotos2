const User = require('../models/user.model');

//? Find all users (✓)
exports.findAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                status: 'available',
            },
        });
        return res.status(200).json({
            status: 'success',
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error,
        });
    }
};

//? Find One user (✓)

exports.findOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
                status: 'available',
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`,
            });
        } else {
            return res.status(200).json({
                status: 'success',
                user,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error,
        });
    }
};

//? Create user (✓)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'client' } = req.body;
        const user = await User.create({ name, email, password, role });
        return res.status(201).json({
            status: 'success',
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error,
        });
    }
};

//? Update user (✓)

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findOne({
            where: {
                id,
                status: 'available',
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`,
            });
        }

        await user.update({ name, email });

        return res.status(200).json({
            status: 'success',
            message: 'User updated succesfully',
        });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error,
        });
    }
};

//? Delete user (✓)

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id,
                status: 'available'
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`,
            });
        }

        await user.update({ status: 'disabled' });

        return res.status(200).json({
            status: 'success',
            message: 'User deleted succesfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error,
        });
    }
};
