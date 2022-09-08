import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orders from "./handlers/orders";

dotenv.config();

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", function (req: Request, res: Response) {
  res.send("API is running...");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
