import express from "express";
import administrator from "../middleware/admin";
import verifyAuthToken from "../middleware/verify_token";
import { register, index, auth, get } from "../handlers/users";

const router = express.Router();

router.route("/").post(register).get(verifyAuthToken, administrator, index);
router.post("/login", auth);
router.get("/:id", get);

export default router;
