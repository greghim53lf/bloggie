import { Router } from "express";
import { testUserRoute } from "../controllers/user.controller.js";

const router = Router()

router.get("/test", testUserRoute)

export default router