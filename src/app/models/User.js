import mongoose from 'mongoose';

// تعريف نموذج المستخدم
const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
