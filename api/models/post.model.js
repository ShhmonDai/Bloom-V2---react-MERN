import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-14138.appspot.com/o/1711317961889-DefaultArticle.png?alt=media&token=48ab7d58-4021-442f-ae1b-042361ff4b4c',
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;