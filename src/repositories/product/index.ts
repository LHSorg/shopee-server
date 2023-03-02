import { Product } from "@app/domain/entities/product";
import { IProductRepository } from "@app/domain/ports/product";
import { injectable } from "tsyringe";
import { AppDataSource } from "@app/configs/DataSource";
import { In } from "typeorm";

@injectable()
export class ProductRepository implements IProductRepository {
  private repo = AppDataSource.getRepository(Product);

  async listAllProducts(): Promise<Product[]> {
    return await this.repo.find();
  }
  async createManyProducts(products: Product[]): Promise<Product[]> {
    return await this.repo.save(products);
  }
  async updateProduct(product: Product): Promise<void> {
    await this.repo.update({ id: product.id }, { ...product });
  }
  async deleteManyProducts(productsIds: number[]): Promise<void> {
    await this.repo.delete({ id: In(productsIds) });
  }
}
