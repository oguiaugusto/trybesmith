import { Router } from 'express';
import ProductController from './controller';

const router = Router();
const controller = new ProductController();

router
  .route('/')
  .get(controller.listAll);

export default router;
