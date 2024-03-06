export interface ProductData {
  openEditForm: boolean;
  success: boolean;
  message: string;
  total_products: number;
  offset: number;
  limit: number;
  product: string;
  edit: boolean;
  selectedProduct: any;
  openDeletePopup: boolean;
  openDeleteDialog: boolean;
  products: Product[];
}
export interface OpenFormProps {
  openForm: boolean;
  updateField: boolean;
  selectedCellValue: FormValues;
  handleCloseForm: () => void;
  handleSubmitForm: (data: FormValues) => void;
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
export interface FetchProductByIdArgs {
  productId: string;
}
export interface FormValues {
  id: any;
  price: string;
  category: string;
  updated_at: string;
  name: string;
  description: string;
}
export interface DialogBoxProps {
  open: boolean;
  selectedCellValue: FormValues;
  handleClose: () => void;
  handleDeleteConfirm: (data: FormValues) => void;
}

export interface OpenModalPayload {
  component: "openDeletePopup" | "openDeleteDialog";
  action: boolean;
}
