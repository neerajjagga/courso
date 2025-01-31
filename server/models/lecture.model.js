import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: [80, "Lecture title should be maximum 80 characters"],
        required: true,
        trim: true,
    },
    description: {
        type: String,
        maxLength: [1000, "Lecture description should be maximum 1000 characters"],
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    courseId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
}, {
    timestamps: true,
});

// .lean() bypasses Mongoose's document transformation. 
lectureSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    },
});

export default mongoose.model('Lecture', lectureSchema);
