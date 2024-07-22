import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
// import isValidId from '../middlewares/isValidId.js';
import {
  createUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

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

usersRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

usersRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

usersRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

usersRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default usersRouter;
