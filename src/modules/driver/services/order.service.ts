import { Types } from "mongoose";
import { OrderModel } from "../../../models/order.model";

type GetNearbyOrdersParams = {
  driverId: Types.ObjectId;
  lat: number;
  lng: number;
  limit: number;
  maxDistanceKm: number;
};




export async function getNearbyOrdersForDriver({
  driverId,
  lat,
  lng,
  limit,
  maxDistanceKm,
}: GetNearbyOrdersParams) {
  const maxDistanceMeters = maxDistanceKm * 1000;

  
  const reservedStatuses = ["order.driver.confirmed", "order.driver.on_the_way"];
  const reservedCount = await OrderModel.countDocuments({
    driver: driverId,
    status: { $in: reservedStatuses },
  });

  if (reservedCount >= limit) {
    return {
      orders: [],
      remainingCapacity: 0,
      reservedCount,
    };
  }

  const remainingCapacity = limit - reservedCount;

  
  const orders = await OrderModel.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] }, 
        distanceField: "distanceMeters",
        spherical: true,
        maxDistance: maxDistanceMeters,
        query: {
          driver: null, 
          status: "order.client.send", 
        },
      },
    },
    { $limit: remainingCapacity },
    {
      $lookup: {
        from: "users",
        localField: "client",
        foreignField: "_id",
        as: "clientInfo",
      },
    },
    {
      $unwind: {
        path: "$clientInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  
  const mapped = orders.map((order) => ({
    _id: order._id,
    code: order.code,
    status: order.status,
    distanceKm: Number((order.distanceMeters / 1000).toFixed(1)),
    distanceMeters: Math.round(order.distanceMeters),
    location: order.location,
    client: order.client,
    clientInfo: order.clientInfo
      ? {
          _id: order.clientInfo._id,
          name: order.clientInfo.name,
        }
      : null,
    createdAt: order.createdAt,
  }));

  return {
    orders: mapped,
    remainingCapacity,
    reservedCount,
  };
}
