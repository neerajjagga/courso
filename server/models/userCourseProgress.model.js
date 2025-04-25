import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});

const moduleProgressSchema = new mongoose.Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true,
    },
    lectures: [lectureProgressSchema],
}, {
    _id: false,
});

const userCourseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    progress: [moduleProgressSchema],
}, {
    timestamps: true,
});

userCourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// moduleSchema.set('toJSON', {
//     versionKey: false,
//     transform: function (doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//     },
// });

const UserCourseProgress = mongoose.model('UserCourseProgress', userCourseProgressSchema);

export default UserCourseProgress;
