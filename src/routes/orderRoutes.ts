import express from "express";
import administrator from "../middleware/admin";
import verifyAuthToken from "../middleware/verify_token";
import {
  add,
  index,
  update,
  show,
  remove,
  completed,
} from "../handlers/orders";

const router = express.Router();

router
  .route("/")
  .post(verifyAuthToken, add)
  .put(verifyAuthToken, update)
  .get(verifyAuthToken, administrator, index);
router.route("/:id").get(verifyAuthToken, show).delete(verifyAuthToken, remove);
router.route("/completed").get(verifyAuthToken, completed);

export default router;
