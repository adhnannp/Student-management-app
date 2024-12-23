import { Request, Response } from 'express';
import Student from '../models/Student';

export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await Student.find();
        res.render('students/index', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Server error');
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, age, grade } = req.body;
        console.log('Creating student:', name, email, age, grade);
        await Student.create({ name, email, age, grade });
        res.status(201).json({ success: true, message: 'Student created successfully' });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).send('Server error');
    }
};

export const editStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, age, grade } = req.body;
        await Student.findByIdAndUpdate(id, { name, age, grade });
        res.status(201).json({ success: true, message: 'Student edited successfully' });
    } catch (error) {
        console.error('Error editing student:', error);
        res.status(500).send('Server error');
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Student.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'Student deleated successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Server error');
    }
};

export const checkEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const student = await Student.findOne({ email });
        if (student) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Server error');
    }
};