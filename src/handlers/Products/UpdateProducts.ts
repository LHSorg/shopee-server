import { IProductRepository } from "../../domain/ports/product";
import { AtLeast } from "./../../commons/types";
import { Handler } from "./../../commons/handler";
import { inject, injectable } from "tsyringe";
import { Product } from "../../domain/entities/product";

export type UpdateProductRequest = {
  product: AtLeast<Product, "id">;
};

@injectable()
export class UpdateProductHandler
  implements Handler<UpdateProductRequest, Promise<void>>
{
  private productRepo: IProductRepository;

  constructor(@inject("ProductRepository") productRepo: IProductRepository) {
    this.productRepo = productRepo;
  }
  async execute(request: UpdateProductRequest): Promise<void> {
    const { product } = request;

    await this.productRepo.updateProduct(product);
  }
}
