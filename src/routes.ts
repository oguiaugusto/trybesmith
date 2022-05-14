import { Router } from 'express';
import productRouter from './Product/routes';
import userRouter from './User/routes';
import orderRouter from './Order/routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

export default router;
