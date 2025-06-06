import mongoose from "mongoose";
import { ILectureDocument } from '../types/lecture.types';

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: [300, "Lecture title should be maximum 300 characters"],
        required: true,
        trim: true,
    },
    titleSlug: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        maxLength: [1000, "Lecture description should be maximum 1000 characters"],
        trim: true,
        default: null,
    },
    videoUrl: {
        type: String,
        default: null,
        trim: true,
    },
    isFreePreview: {
        type: Boolean,
        default: false,
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true,
    }
}, {
    timestamps: true,
});

lectureSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    },
});

const LectureModel = mongoose.model<ILectureDocument>('Lecture', lectureSchema);

export default LectureModel;
