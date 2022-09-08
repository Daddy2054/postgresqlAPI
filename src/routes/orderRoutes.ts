import express from "express";
import administrator from "../middleware/admin";
import verifyAuthToken from "../middleware/verify_token";
import { create, index, auth, get } from "../handlers/orders";

const router = express.Router();

router.route("/").post(verifyAuthToken,create).get(verifyAuthToken, administrator, index);
router.post("/login", auth);
router.get("/:id", get);

export default router;
