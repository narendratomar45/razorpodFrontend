export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
  products: Product[];
  productDetail: Product | null;
  categories: string[];
  categoryProducts: Product[];
}
