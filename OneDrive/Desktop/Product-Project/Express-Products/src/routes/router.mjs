import {Router} from "express";
import productRouter from "../routes/products.mjs"
import userRouter from "../routes/users.mjs"
const router=Router()
router.use(productRouter);
router.use(userRouter);
export default router;