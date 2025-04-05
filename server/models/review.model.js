import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
}, {
    timestamps: true,
});

reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// moduleSchema.set('toJSON', {
//     versionKey: false,
//     transform: function (doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//     },
// });

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
