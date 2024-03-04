export interface ProductData {
  success: boolean;
  message: string;
  total_products: number;
  offset: number;
  limit: number;
  product: string;
  edit: boolean;
  selectedProduct: any;
  openDeletePopup: any;
  openDeleteDialog: boolean;
  products: Product[];
}

export interface Product {
  photo: any;
  user: number;
  message: string;
  photo_url: string;
  id: number;
  price: number;
  category: string;
  updated_at: string;
  name: string;
  description: string;
  image: string;
}

export interface editValues {
  id: number;
  price: string;
  category: string;
  updated_at: string;
  name: string;
  description: string;
  selectedCellValue: string;
}

export interface OpenModalPayload {
  component: "edit" | "openDeleteDialog";
  action: boolean;
}
