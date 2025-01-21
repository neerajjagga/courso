import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        maxLength : [20, "Name should be maximum 20 characters "],
        required : [true, "Fullname is required"],
        trim : true,
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        trim : true,
        unique : true,
    },
    password : {
        type : String,
        minLength : [6, "Password must be at least 6 characters long"],
        required : [true, "Password is required"],
        trim : true,
        lowercase : true,
    },
    profileImageUrl : {
        type : String,
        default : "",
        trim : true,
    },
    // username : {
    //     type : String,
    //     minLength : [3, "Username must be at least 6 characters long"],
    //     required : [true, "Username is required"],
    //     unique : true,
    //     trim : true,
    // },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    interestedInField : {
        type : String,
        default : "",
        trim : true,
    },
    interestedInSkills : {
        type : [String],
    },
    bio : {
        type : String,
        maxLength : [100, "Bio should be maximum 100 characters long"],
        trim : true,
        default : "",
    },
    socialLinks : {
        type : [{
            name : {
                type : String,
            },
            url : {
                type : String,
            }
        }]
    },
    enrolledIn : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        }]
    },
    isProfileCompleted : {
        type : Boolean,
        default : false,
    },
}, {
    timestamps : true,
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.set('toJSON', {
    versionKey : false,
    transform : function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;

        // ret.email = ret.email.replace(/(.{2})(.*)(@.*)/, '$1****$3');
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;