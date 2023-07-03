const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = require("mongodb");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: [3, "Name is too small"],
            maxLength: [100, "Name is too long"],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        gender: String,
        
        password: {
            type: String,
        },
        contactNumber: {
            type: String,
            validate: [
                validator.isMobilePhone,
                "Please provide a valid phone number",
            ],
        },
        profilePicture: {
            type: String,
            // required: true,
            validate: [validator.isURL, "wrong url"],
        },
        address: String,

        status: {
            type: String,
            default: "active",
            enum: {
                values: ["active", "in-active", "blocked"],
                message: "{VALUE} can't be a status",
            },
        },
        
        role: {
            type: String,
            default: "user",
            enum: {
                values: ["user", "admin"],
                message: "{VALUE} can't be a role",
            },
        },
        
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timeStamps: true,
    }
);

userSchema.pre("save", function (next) {
    if (this.password) {
        const password = this.password;
        const hash = bcrypt.hashSync(password);
        this.password = hash;
        next();
    }
    next();
});

userSchema.methods.comparePassword = function (password, hash) {
    const isValidPassword = bcrypt.compareSync(password, hash);
    return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
