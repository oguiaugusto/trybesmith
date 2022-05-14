import { Router } from 'express';
import OrderController from './controller';

const router = Router();
const controller = new OrderController();

router
  .route('/')
  .get(controller.listAll);

export default router;
