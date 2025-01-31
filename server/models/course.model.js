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
        default: "",
    },
    description: {
        type: String,
        maxLength: [3000, "Description should be maximum 3000 characters"],
        trim: true,
        default: "",
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: String,
        required: true,
        trim: true,
    },
    courseImageUrl: {
        type: String,
        default: "",
        trim: true,
    },
    price: {
        amount: {
            type: Number,
            min: 0,
            required: true,
            trim: true,
        },
        currencyCode: {
            type: String,
            default: "inr"
        },
        currencySymbol: {
            type: String,
            default: "₹",
        },
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
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
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

courseSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    },
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;
