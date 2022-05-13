import { Router } from 'express';
import productRouter from './Product/routes';
import userRouter from './User/routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;
