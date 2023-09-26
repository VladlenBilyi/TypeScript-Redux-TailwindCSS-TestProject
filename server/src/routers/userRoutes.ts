import  express  from "express";
const userRouter = express();

import { register, login } from "../controller/userController";
import { isAuth } from "../middleware/isAuth";

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;