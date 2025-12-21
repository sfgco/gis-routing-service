import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { getNearbyOrdersForDriver } from "../services/order.service";

const nearbyOrdersSchema = z.object({
  driverId: z.string().min(1, "driverId is required"),
  location: z.object({
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    lng: z
      .number()
      .min(-180)
      .max(180, "Longitude must be between -180 and 180"),
  }),
  limit: z.number().int().positive().max(20).default(3),
  maxDistanceKm: z.number().positive().max(50).default(20),
});





export const getNearbyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = nearbyOrdersSchema.parse(req.body);

    
    if (!mongoose.Types.ObjectId.isValid(parsed.driverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driverId format",
      });
    }

    const driverId = new mongoose.Types.ObjectId(parsed.driverId);

    const { orders, remainingCapacity, reservedCount } =
      await getNearbyOrdersForDriver({
        driverId,
        lat: parsed.location.lat,
        lng: parsed.location.lng,
        limit: parsed.limit,
        maxDistanceKm: parsed.maxDistanceKm,
      });

      return res.status(200).json({
        success: true,
        data: {
          orders,
          capacity: {
            total: parsed.limit,
            reserved: reservedCount,
            remaining: remainingCapacity,
            isFull: remainingCapacity === 0,
          },
        },
      })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};
