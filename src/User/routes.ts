import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from './controller';

const router = Router();
const controller = new UserController();

router
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().min(3).required(),
        classe: Joi.string().min(3).required(),
        level: Joi.number().min(1).required(),
        password: Joi.string().min(8).required(),
      }),
    }),
    controller.create,
  );

export default router;
