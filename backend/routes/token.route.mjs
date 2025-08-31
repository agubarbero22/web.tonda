import { Router } from "express";
import { checkToken } from "../controllers/token.controller.mjs";

const tokenRouter = Router();

tokenRouter.post("/", checkToken);

export default tokenRouter;
