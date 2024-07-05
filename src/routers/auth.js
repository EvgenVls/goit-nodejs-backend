import { Router } from 'express';
import { registerUserController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
// import isValidId from '../middlewares/isValidId.js';
import { createUserSchema } from '../validation/auth.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

export default usersRouter;
