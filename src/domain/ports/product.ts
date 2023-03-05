import { AtLeast, CreateProduct } from "../../commons/types";
import { Product } from "../../domain/entities/product";

export interface IProductRepository {
  listAllProducts(): Promise<Product[]>;
  createManyProducts(products: CreateProduct[]): Promise<Product[]>;
  deleteManyProducts(productsIds: number[]): Promise<void>;
  updateProduct(product: AtLeast<Product, "id">): Promise<void>;
}
