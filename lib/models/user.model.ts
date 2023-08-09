import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: String,
    image: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Community' 
        }
    ],
    onboarded: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;