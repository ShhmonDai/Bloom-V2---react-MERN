import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    scoresFrom: {
        type: Number,
        default: 12,
    },
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
