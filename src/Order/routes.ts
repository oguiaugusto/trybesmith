import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrderController from './controller';
import authMiddleware from '../middlewares/auth';

const router = Router();
const controller = new OrderController();

router
  .route('/')
  .get(controller.listAll)
  .post(
    authMiddleware,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        productsIds: Joi.array().items(Joi.number()).required(),
      }),
    }),
    controller.create,
  );

export default router;
