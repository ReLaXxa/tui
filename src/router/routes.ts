import { Router } from "express";
import * as gitHubController from "../controllers/github";

const router = Router();

router.get("/:user", gitHubController.getUserRepos);

export default router;
