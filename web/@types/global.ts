export interface ProductHolderTypes {
  productName: string;
  mp: number;
  discount: number;
  rating: number;
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
}

export interface ProtuctType {
  id: number;
  name: string;
  price: number;
  discount?: number;
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
}

interface OnCartProductType {
  productName: string;
  productID: number;
  quantity: number;
  sizes?: string;
  color?: string;
  price: number;
}

export interface Cart {
  products: OnCartProductType[];
  subTotal: number;
  totalProducts: number;
}
