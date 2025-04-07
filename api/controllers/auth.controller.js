import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, password } = req.body;
    const email = req.body.email.toLowerCase();

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
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

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup succesful');

    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const { password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true, maxAge: 60 * 60 * 24 * 1000,
        })
        .json(rest);


    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true, maxAge: 60 * 60 * 24 * 1000,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true, maxAge: 60 * 60 * 24 * 1000,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const authenticateToken = (req, res, next) => {
    if (!req.user) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        next(error);
    }
};