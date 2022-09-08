import express from "express";
import administrator from "../middleware/admin";
import verifyAuthToken from "../middleware/verify_token";
import { create, index, show, remove } from "../handlers/products";

const router = express.Router();

router.route("/").get(index).post(verifyAuthToken, administrator, create);

router.route("/:id").get(show).delete(verifyAuthToken, administrator, remove);

export default router;
