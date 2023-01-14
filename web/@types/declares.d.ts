declare interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "customer" | "seller" | "admin";
  phoneNo: number;
  gender: "male" | "female" | "others";
  cart?: Cart;
  address: Address[];
  created_at: string;
  updated_at: string;
}

declare interface Address {
  deliveryAddress: string;
  id: number;
  laglat: string;
  nearestLandmark: string;
  phoneNo: string;
}

declare interface RespondType {
  status: "ok" | "fail";
  message: string;
}
