import { Product } from "../../domain/entities/product";
import { IProductRepository } from "../../domain/ports/product";
import { injectable } from "tsyringe";
import { AppDataSource } from "../../configs/DataSource";
import { In } from "typeorm";
import { CreateProduct } from "../../commons/types";

@injectable()
export class ProductRepository implements IProductRepository {
  private repo = AppDataSource.getRepository(Product);

  async listAllProducts(): Promise<Product[]> {
    return await this.repo.find();
  }
  async createManyProducts(products: CreateProduct[]): Promise<Product[]> {
    return await this.repo.save(this.repo.create(products));
  }
  async updateProduct(product: Product): Promise<void> {
    await this.repo.update({ id: product.id }, { ...product });
  }
  async deleteManyProducts(productsIds: number[]): Promise<void> {
    await this.repo.delete({ id: In(productsIds) });
  }
}
