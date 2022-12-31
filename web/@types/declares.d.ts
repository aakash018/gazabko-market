declare interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "customer" | "seller" | "admin";
  phoneNo: number;
  gender: "male" | "female" | "others";
  cart?: Cart;
  address: {
    deliveryAddress: string;
    id: number;
    lnglat: { lat: number; lng: number };
    nearestLandmark: string;
  };
}

declare interface RespondType {
  status: "ok" | "fail";
  message: string;
}
