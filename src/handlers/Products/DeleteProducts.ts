import { IProductRepository } from "@app/domain/ports/product";
import { Handler } from "./../../commons/handler";
import { inject, injectable } from "tsyringe";

export type DeleteProductsRequest = {
  products_ids: number[];
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
    const { products_ids } = request;

    await this.productRepo.deleteManyProducts(products_ids);
  }
}
