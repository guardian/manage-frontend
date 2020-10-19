import { Router } from "express";
import { contactUsConfig } from "../contactUsConfig";

const router = Router();

router.get("/contact-us-config", (_, res) => res.json(contactUsConfig));

export default router;
