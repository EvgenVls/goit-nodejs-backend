import { Router } from 'express';
import {
  getAllStudentsController,
  getStudentByIdController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const studentsRouter = Router();

studentsRouter.get('/', ctrlWrapper(getAllStudentsController));

studentsRouter.get('/:studentId', ctrlWrapper(getStudentByIdController));

export default studentsRouter;
