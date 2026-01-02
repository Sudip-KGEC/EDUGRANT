import { Request, Response } from 'express';
import Scholarship from '../models/Scholarship'; 
import User from '../models/User';

export const getScholarships = async (req: Request, res: Response) => {
  try {
    const scholarships = await Scholarship.find({}).sort({ createdAt: -1 });
    res.json(scholarships);
    
  } catch (error) {
     res.status(500).json({ message: 'Server Error' });
  }

}

// export const searchScholarships = async (req: Request, res: Response) => {
//   try {
//     const { keyword } = req.query;

//     let query = {};

//     if (keyword) {
//       query = {
//         $or: [
//           { name: { $regex: keyword, $options: 'i' } },
//           { provider: { $regex: keyword, $options: 'i' } },
//           { category: { $regex: keyword, $options: 'i' } }
//         ],
//       };
//     }

//     const scholarships = await Scholarship.find(query).sort({ createdAt: -1 });
//     res.json(scholarships);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

export const addScholarship = async (req: Request, res: Response) => {
  try {
    const {
      name,
      provider,
      amount,
      deadline,
      category,
      gpaRequirement,
      degreeLevel,
      description,
      eligibility
    } = req.body;

    const scholarship = new Scholarship({
      name,
      provider,
      amount: Number(amount), 
      gpaRequirement: Number(gpaRequirement), 
      deadline: new Date(deadline), 
      category: category || 'General',
      degreeLevel,
      description,
      eligibility
    });

    const savedScholarship = await scholarship.save();
    res.status(201).json(savedScholarship);
  } catch (error: any) {
    console.error("Add Scholarship Error:", error);
    res.status(400).json({ message: error.message || 'Invalid Data' });
  }
};

export const applyToScholarship = async (req: Request, res: Response) => {
  try {
    const { scholarshipId } = req.body;
    
    const user = (req as any).user;
    
    if (!user || !user._id) {
      console.error("Apply Error: User object missing from request. Is the route protected?");
      return res.status(401).json({ message: 'Authentication required. Please log in again.' });
    }

    const userId = user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { appliedScholarships: scholarshipId } }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'Applied successfully', 
      appliedScholarships: updatedUser.appliedScholarships 
    });
  } catch (error: any) {
    console.error("Apply Error:", error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};