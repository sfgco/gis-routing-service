import { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * this function for GIS reports
 * @STATUS : Not Implemented
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const report1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "Not Implemented" });
  } catch (error) {
    next(error);
  }
};

export const payloadSchema = z.object({
  name: z.string().min(4),
  phone: z.string().min(10),
});
