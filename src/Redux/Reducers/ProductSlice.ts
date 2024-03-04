import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductApi } from "../../Api/ProductApi";
import { RootState } from "../store";
import {
  OpenModalPayload,
  Product,
  ProductData,
} from "../../Types/Products-types";

const initialState: ProductData = {
  success: false,
  message: "",
  total_products: 0,
  offset: 0,
  limit: 0,
  products: [],
  product: "0",
  edit: false,
  openDeletePopup: false,
  openDeleteDialog: false,
  selectedProduct: undefined,
};

interface FetchProductByIdArgs {
  productId: string;
}

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async ({ page, pageSize }: FetchProductDataArgs) => {
    try {
      const response = await ProductApi.fetchProduct(page, pageSize);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching products data:", error);
      throw error;
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async ({ productId }: FetchProductByIdArgs) => {
    const response = await fetch(
      `https://api.slingacademy.com/v1/sample-data/photos/${productId}`
    );
    const data = await response.json();
    console.log("response===>", data);
    return data;
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    openCloseModal(
      state: ProductData,
      action: PayloadAction<OpenModalPayload>
    ) {
      const { component, action: modalAction } = action.payload;
      return {
        ...state,
        [component]: modalAction,
      };
    },
    setCurrentProduct(state, action: PayloadAction<FetchProductByIdArgs>) {
      return {
        ...state,
        product: action.payload.productId,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProductData.fulfilled,
        (state: ProductData, action: PayloadAction<ProductData>) => {
          const { total_products, offset, limit, products } = action.payload;
          return {
            ...state,
            success: true,
            message: "success",
            total_products,
            offset,
            limit,
            products,
          };
        }
      )
      .addCase(fetchProductData.pending, (state: ProductData) => {
        return {
          ...state,
          message: "loading",
          products: [],
        };
      })
      .addCase(fetchProductData.rejected, (state: ProductData) => {
        return {
          ...state,
          success: false,
          message: "error",
          products: [],
        };
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        console.log("======>action.payload", action.payload);
        return {
          ...state,
          selectedProduct: action.payload,
        };
      })
      .addCase(fetchProductById.pending, (state) => {
        return {
          ...state,
          message: "loading",
        };
      })
      .addCase(fetchProductById.rejected, (state) => {
        return {
          ...state,
          message: "error fetching product",
        };
      });
  },
});

interface FetchProductDataArgs {
  page: number;
  pageSize: number;
}

export const { openCloseModal, setCurrentProduct } = ProductSlice.actions;
export const selectSelectedProduct = (state: RootState) =>
  state.productReducer.selectedProduct;
export default ProductSlice.reducer;
