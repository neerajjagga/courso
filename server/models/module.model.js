import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: [120, "Module title should be maximum 120 characters"],
        required: true,
        trim: true,
    },
    titleSlug: {
        type: String,
        trim: true,
        unique: true,
    },
    // order: {
    //     type: Number,
    //     required: true,
    //     unique : [true, "Order must be unique"]
    // },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
}, {
    timestamps: true,
});

moduleSchema.virtual('lectures', {
    ref: 'Lecture',
    localField: '_id',
    foreignField: 'moduleId',
});

moduleSchema.set('toJSON', {
    versionKey: false,
    virtuals : true,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    },
});

const ModuleModel = mongoose.model('Module', moduleSchema);

export default ModuleModel;
