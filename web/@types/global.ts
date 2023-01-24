export interface ProductHolderTypes {
  productName: string;
  mp: number;
  discount: number;
  rating: number;
}

export interface Seller {
  id: number;
  username: string;
  email: string;
  storeName: string;
  address: string;
  contactPerson: string;
  phoneNo: number;
  role: "seller";
  isVerified: boolean;
  panNo: number;
  productCount?: number;
}

export interface AdminType {
  id: string;
  username: string;
  email?: string;
  address?: string;
  contactPerson?: string;
  phoneNo: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProtuctPayloadType {
  productName: string;
  price: number;
  discount?: number;
  description?: string;
  totalStock: number;
  offer?: string;
  sizes?: string;
  tags: string;
  category: string;
  subCategory: string;
  subsubCategory?: string;
  sku: number;
  brand: string;
  images: string;
  store?: string;
  color: string;
}

export interface ProtuctType {
  id: number;
  name: string;
  price: number;
  rating: number;
  discount: number;
  description: string;
  totalStock: number;
  offer?: string;
  sizes?: string;
  tags: string;
  isHidden: boolean;
  category: string;
  subCategory: string;
  subsubCategory?: string;
  sku: number;
  brand: string;
  images: string;
  store?: string;
  color?: string;
  seller: Seller;
  priceAfterDiscount: number;
  timesBought: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  color: string;
  id: number;
  isGift: boolean;
  quantity: number;
  size?: string;
  status: "pending" | "processing" | "delivered";
  deliveryAddress: string;
  nearestLandmark: string;
  latlng: string;
  user?: User;
  created_at: string;
  updated_at: string;
  product?: ProtuctType;
}

export interface OnCartProductType {
  product: ProtuctType;
  quantity: number;
  sizes?: string;
  color?: string;
  isGift?: boolean;
}

export interface Cart {
  products: OnCartProductType[];
  subTotal: number;
  totalProducts: number;
}

export interface FollowerResponseType {
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
    id: number;
  };
  userId: number;
  sellerId: number;
}

export interface FollowerType {
  lastName: string;
  itemsBoughtFromStore: number;
  totalMoneySpentAtStore: number;
  joinedDate: string;
  isVerified: boolean;
  avatar: string;
}
