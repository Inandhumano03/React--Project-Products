import userRouter from './routes/users.mjs'
import productRouter from './routes/products.mjs'
import {Router} from "express"
const router=Router()
router.use(userRouter);
router.use(productRouter);

export default router;