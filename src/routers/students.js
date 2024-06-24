import { Router } from 'express';
import {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';

const studentsRouter = Router();

studentsRouter.get('/', ctrlWrapper(getAllStudentsController));

studentsRouter.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post('/', ctrlWrapper(createStudentController));

studentsRouter.delete(
  '/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

studentsRouter.put('/:studentId', isValidId, ctrlWrapper(upsertStudentController))l

export default studentsRouter;
