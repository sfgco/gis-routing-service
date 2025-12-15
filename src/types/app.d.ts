export type UserRole = "user" | "admin" | "vendor";

export type Address = {
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
};

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  fcmToken?: string;
  city?: string;
  address?: Address;
};

export type Review = {
  reviewId: string;
  user: User;
  rating: number;
  comment?: string;
  createdAt: Date;
};
