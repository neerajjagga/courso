import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: [80, "Title should be maximum 80 characters"],
        required: true,
        trim: true,
    },
    titleSlug: {
        type: String,
        trim: true,
        unique: true,
    },
    subtitle: {
        type: String,
        maxLength: [200, "Subtitle should be maximum 200 characters"],
        trim: true,
        default: null,
    },
    description: {
        type: String,
        maxLength: [3000, "Description should be maximum 3000 characters"],
        trim: true,
        default: null,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: String,
        required: [true, "Level is required"],
        enum: {
            values: ["beginner", "intermediate", "expert", "all"],
            message: 'Level must be either "beginner", "intermediate", "expert" or "all"'
        },
        trim: true,
    },
    courseImageUrl: {
        type: String,
        default: null,
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Price is required"],
        trim: true,
    },
    lectures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

// course.model.js
courseSchema.virtual('modules', {
    ref: 'Module',
    localField: '_id',
    foreignField: 'courseId',
});

courseSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    },
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;
