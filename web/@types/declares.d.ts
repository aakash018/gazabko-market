declare interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "customer" | "seller" | "admin";
  phoneNo: number;
  gender: "male" | "female" | "others";
  cart?: any;
  address: {
    deliveryAddress: string;
    id: number;
    lnglat: { lat: number; lng: number };
    nearestLandmark: string;
  };
}

declare module "turnstone";
