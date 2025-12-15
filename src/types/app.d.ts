export type UserRole = "driver" | "admin";

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
