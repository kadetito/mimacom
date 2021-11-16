export interface ProductsInterface {
  id?: string;
  image_url?: string;
  stock?: number;
  productName?: string;
  price?: number;
  productDescription?: string;
  favorite?: number | string;
  product: ProductInterface;
  addCart: any;
}

interface ProductInterface {
  id?: string;
  image_url?: string;
  stock?: number;
  productName?: string;
  price?: number;
  productDescription?: string;
  favorite?: number | string;
}
