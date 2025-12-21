import express from "express";
import { getNearbyOrders } from "../controllers/order.controller";

const driverRouter = express.Router();


driverRouter.post("/orders/nearby", getNearbyOrders);

export default driverRouter;
