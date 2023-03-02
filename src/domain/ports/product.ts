import { AtLeast, CreateProduct } from "@app/commons/types";
import { Product } from "@app/domain/entities/product";

export interface IProductRepository {
  listAllProducts(): Promise<Product[]>;
  createManyProducts(products: CreateProduct[]): Promise<Product[]>;
  deleteManyProducts(productsIds: number[]): Promise<void>;
  updateProduct(product: AtLeast<Product, "id">): Promise<void>;
}
