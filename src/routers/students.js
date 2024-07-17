import { Router } from 'express';
import {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import isValidId from '../middlewares/isValidId.js';
import { checkRoles } from '../middlewares/checkRoles.js';

import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { ROLES } from '../constants/index.js';

const studentsRouter = Router();

studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getAllStudentsController),
);

studentsRouter.get(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.PARENT, ROLES.TEACHER),
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  // checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.delete(
  '/:studentId',
  isValidId,
  // checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);

studentsRouter.put(
  '/:studentId',
  isValidId,
  // checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

studentsRouter.patch(
  '/:studentId',
  isValidId,
  // checkRoles(ROLES.TEACHER, ROLES.PARENT),
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default studentsRouter;
