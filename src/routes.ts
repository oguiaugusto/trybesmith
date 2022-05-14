import { Router } from 'express';
import productRouter from './Product/routes';
import userRouter from './User/routes';
import orderRouter from './Order/routes';
import loginRouter from './Login/routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/login', loginRouter);

export default router;
