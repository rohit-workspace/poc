import axios from "axios";
import { ProductData } from "../Types/Products-types";

const BASE_URL = "https://api.slingacademy.com/v1/sample-data";

export class ProductApi {
  static async fetchProduct(
    page: number,
    pageSize: number
  ): Promise<ProductData> {
    const { data } = await axios.get<ProductData>(
      `${BASE_URL}/products?offset=${page * pageSize}&limit=${pageSize}`
    );
    return data;
  }
}
