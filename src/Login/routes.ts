import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import LoginController from './controller';

const router = Router();
const controller = new LoginController();

router
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    controller.login,
  );

export default router;
