import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  college: string;
  cgpa: number;
  class12Marks: number;
  role: 'student' | 'admin';
  appliedScholarships: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  cgpa: { type: Number, required: true },
  class12Marks: { type: Number, required: true },
  role: { type: String, default: 'student' },
  appliedScholarships: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);