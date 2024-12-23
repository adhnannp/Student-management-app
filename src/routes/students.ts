import { Router } from 'express';
import { getAllStudents, createStudent, editStudent, deleteStudent, checkEmail } from '../controllers/studentController';

const router = Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:id', editStudent);
router.delete('/:id', deleteStudent);
router.post('/check-email', checkEmail);

export default router;