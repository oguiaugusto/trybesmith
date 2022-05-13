import { Router } from 'express';
import productRouter from './Product/routes';

const router = Router();

router.use('/products', productRouter);

export default router;
