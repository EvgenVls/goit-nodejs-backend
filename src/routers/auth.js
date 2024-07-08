import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
// import isValidId from '../middlewares/isValidId.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';

const usersRouter = Router();

usersRouter.post(
  '/signup',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

usersRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default usersRouter;
