import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProductController from './controller';

const router = Router();
const controller = new ProductController();

router
  .route('/')
  .get(controller.listAll)
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(3).required(),
        amount: Joi.string().min(3).required(),
      }),
    }),
    controller.create,
  );

export default router;
