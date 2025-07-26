import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import { deleteFirebaseImage } from '../utils/deleteFirebaseImage.js';

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {

    const password = req.body.password;

    if (req.user.id !== req.params.userId || req.params.userId == process.env.DEMO_ID ) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    if (!password) { 
        return next(errorHandler(400, 'Current password is required'));
    }

    try {
        const validUser = await User.findById(req.params.userId );

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, 'Invalid current password'));
        }
    } catch (error) {
        next(error);
    }



    if (req.body.passwordnew) {
        if (req.body.passwordnew.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.passwordnew = bcryptjs.hashSync(req.body.passwordnew, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20) {
            return next(
                errorHandler(400, 'Username must be between 5 and 20 characters')
            );
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
    }
    try {
        const user = await User.findById(req.params.userId); // Fetch current user data

        // If a new profilePicture is provided and different from the existing one
        if (req.body.profilePicture && user.profilePicture !== req.body.profilePicture) {
            await deleteFirebaseImage(user.profilePicture);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.passwordnew,
                },
            },
            { new: true }
        );
        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Delete profile picture from Firebase, if applicable
        if (user.profilePicture) {
            await deleteFirebaseImage(user.profilePicture);
        }

        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted successfuly'});
    } catch (error) {
        next(error);
    }

};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    } 
};

export const getUsers = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
        .sort({ createdAt: sortDirection})
        .skip(skip)
        .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest} = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo }, 
        });

        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            totalPages,
            lastMonthUsers,
        });

    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
