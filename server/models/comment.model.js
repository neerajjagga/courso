import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

commentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// moduleSchema.set('toJSON', {
//     versionKey: false,
//     transform: function (doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//     },
// });

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
