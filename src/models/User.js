import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 4,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4,
            maxlength: 50,
        },


        phone: {
            type: Number,
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "user", "manager", "assManager"],
            default: "user",
        },

        deportment: {
            type: String,
            enum: ["admin", "quality", "technical", "GST", "security", "projecting", "developing", "hr", "driver", "store"],
        },
        branch: {
            type: String,
            trim: true,
            default: "",
        },

        otp: { type: String },
        otpExpiry: { type: Date },
    },
    {
        timestamps: true,
    },
);
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;