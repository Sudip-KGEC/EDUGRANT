import mongoose, { Document, Schema } from 'mongoose';

export interface IScholarship extends Document {
  name: string;
  provider: string;
  amount: number;
  deadline: Date;
  category: string;
  gpaRequirement: number;
  degreeLevel: string;
  description: string;
  eligibility: string[];
}

const ScholarshipSchema: Schema = new Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  category: { type: String, required: true, index: true }, 
  gpaRequirement: { type: Number, required: true },
  degreeLevel: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: [{ type: String }],
}, {
  timestamps: true 
});

export default mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);