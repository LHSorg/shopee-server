import { IProductRepository } from "@app/domain/ports/product";
import { Handler } from "./../../commons/handler";
import { inject, injectable } from "tsyringe";

export type DeleteProductsRequest = {
  productsIds: number[];
};

@injectable()
export class DeleteProductsHandler
  implements Handler<DeleteProductsRequest, Promise<void>>
{
  private productRepo: IProductRepository;

  constructor(@inject("ProductRepository") productRepo: IProductRepository) {
    this.productRepo = productRepo;
  }
  async execute(request: DeleteProductsRequest): Promise<void> {
    const { productsIds } = request;

    await this.productRepo.deleteManyProducts(productsIds);
  }
}
