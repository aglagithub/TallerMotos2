const User = require('../models/user.model');
const bycrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt')

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
        const { user } = req;
        return res.status(200).json({
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

//? Create user (✓)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'client' } = req.body;
        //Encriptación de contaseña

        const salt = await bycrypt.genSalt(12);
        const hashPassword = await bycrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashPassword, role });

        //creación de token
        const token = await generateJWT(user.id);

        return res.status(201).json({
            status: 'success',
            token,
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
        const { user } = req;
        const { name, email } = req.body;

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
        const { user } = req;

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

//? POST login
exports.login = async (req, res) => {
    //console.log('Hello from login')
  
    try {
        const { email, password } = req.body;
        
        // ver si el usuario existe
        const user = await User.findOne({
            where: {
                email,
                status: 'available',
            }
        })

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials',
            });

        }

        //Ver si la contraseña es correcta o no
        if (!(await bycrypt.compare(password, user.password))) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials',
            })
        }
        // si la contraseña es correcta, envia token
        const token = await generateJWT(user.id);

        return res.status(200).json({
            status: 'success',
            token,
            user,

        })


    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        })

    }
};
