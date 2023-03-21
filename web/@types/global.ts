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
  isBanned: boolean;
  storeName: string;
  address: string;
  contactPerson: string;
  phoneNo: string;
  role: "seller";
  rating: number;
  isVerified: boolean;
  panNo: string;
  productCount?: number;
  itemsSold: number;
  created_at: string;
  updated_at: string;
}

export interface AdminType {
  id: string;
  name: string;
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
  sizes?: string;
  tags: string;
  isHidden: boolean;
  category: Category;

  sku: number;
  brand: string;
  images: string;
  offers?: OfferType;
  store?: string;
  color?: string;
  wishlist: WishlistProductsType[];
  seller: Seller;
  priceAfterDiscount: number;
  timesBought: number;
  created_at: string;
  updated_at: string;
}

export interface ReturnMessageType {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
  requestAccepted: boolean;
  requestRejected: boolean;
}

export interface Order {
  color: string;
  id: number;
  isGift: boolean;
  quantity: number;
  size?: string;
  status: "pending" | "processing" | "delivered";
  deliveryAddress: string;
  price: number;
  isToBeReturned: boolean;
  return?: ReturnMessageType;
  nearestLandmark: string;
  latlng: string;
  user?: User;
  offer?: OfferType;
  created_at: string;
  updated_at: string;
  product?: ProtuctType;
  state: "received" | "outForDelivery" | null;
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
  firstName: string;
  lastName: string;
  avatar: string;
  id: number;
}

export interface FollowerType {
  lastName: string;
  itemsBoughtFromStore: number;
  totalMoneySpentAtStore: number;
  joinedDate: string;
  isVerified: boolean;
  avatar: string;
}

export interface OfferType {
  id: string;
  name: string;
  starting_date: Date;
  ending_date: Date;
  show_on_homepage: boolean;
  common_discount: boolean;
  discount: number | null;
  products?: ProtuctType[];
  created_at: Date;
  updated_at: Date;
}

export interface SubSubCategory {
  id: string;
  name: string;
  created_at: Date;
  updatedAt: Date;
}

export interface SubCategory {
  id: string;
  name: string;
  subsubCategories: SubSubCategory[];
  commission: number;
}

export interface Category {
  id: string;
  name: string;
  subCatagories: SubCategory[];
  commission: number;
}

export interface WishlistProductsType {
  id: string;
  product?: ProtuctType;
  wishlist?: WishlistType;
  liked: boolean;
  productID: string;
  wishlistID: string;
  created_at: Date;
}

export interface WishlistType {
  id: string;
  user: User;
  items: WishlistProductsType[];
}
