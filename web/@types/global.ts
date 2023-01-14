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
  discount: number;
  description: string;
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
  color?: string;
  seller: Seller;
  priceAfterDiscount: number;
}

export interface Order {
  color: string;
  id: number;
  isGift: boolean;
  quantity: number;
  size?: string;
  status: "pending" | "processing" | "delivered";
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

export interface FollowerType {
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
    id: number;
  };
  userId: number;
  sellerId: number;
}
