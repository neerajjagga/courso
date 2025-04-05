import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        maxLength: [20, "Name should be maximum 20 characters"],
        required: [true, "Fullname is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters long"],
        required: [true, "Password is required"],
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'instructor'],
        default: 'user',
    },
    profileImageUrl: {
        type: String,
        default: null,
        trim: true,
    },
    socialLinks: [
        {
            name: {
                type: String,
                enum: ['github', 'linkedin', 'twitter', 'portfolio', 'facebook', 'instagram'],
                required: true,
                trim: true
            },
            url: {
                type: String,
                required: true,
                trim: true
            },
            username: {
                type: String,
                default: "",
                trim: true
            },
            _id: false
        }
    ],
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    category: { // admin
        type: String,
        trim: true,
    },
    bio: { // admin
        type: String,
        maxLength: [60, "Headline should be maximum 60 characters long"],
        trim: true,
        default: null,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;

        if (ret.role === "user") {
            delete ret.courses;
            delete ret.biography;
        }
    },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
